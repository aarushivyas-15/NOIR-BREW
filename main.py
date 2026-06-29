from fastapi import FastAPI, HTTPException, Request, Depends, Response, status
from fastapi.staticfiles import StaticFiles


from sqlalchemy.orm import Session
from datetime import timedelta
from typing import Optional
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from database import get_db, engine
from models import Base, User, Order, OrderItem
from schemas import UserCreate, UserLogin, OrderCreate, UserResponse, OrderResponse

from dotenv import load_dotenv
from google import genai
import os
from auth import (
    get_password_hash, authenticate_user, create_access_token,
    get_current_user, get_current_user_optional,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

# Tables create karo
Base.metadata.create_all(bind=engine)

app = FastAPI(title="NOIR BREW")
@app.get("/healthz")
def health():
    return {"status": "ok"}

app.mount("/static", StaticFiles(directory="static"), name="static")


# ─── MODELS ───
class SubscribeRequest(BaseModel):
    email: str

class CartItemRequest(BaseModel):
    id: int
    name: str
    price: float
    image: str
    category: str
    quantity: int = 1

subscribers = []
cart = []

# ─── PAGES ───




# ─── AUTH ROUTES ───
@app.post("/api/register")
async def register(data: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(
        name=data.name,
        email=data.email,
        hashed_password=get_password_hash(data.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "Registration successful", "user": {"name": user.name, "email": user.email}}

@app.post("/api/login")
async def login(data: UserLogin, response: Response, db: Session = Depends(get_db)):
    user = authenticate_user(db, data.email, data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        max_age=1800,
        samesite="lax",
        secure=False
    )
    print("TOKEN CREATED:", access_token[:20])

    return {"message": "Login successful", "user": {"name": user.name, "email": user.email}}

@app.post("/api/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out"}

@app.get("/api/me")
async def get_me(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_optional(
        access_token=request.cookies.get("access_token"),
        db=db
    )
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return {"name": user.name, "email": user.email, "id": user.id}

# ─── ORDER ROUTES ───
@app.post("/api/orders")
async def place_order(data: OrderCreate, request: Request, db: Session = Depends(get_db)):
    print("COOKIE:", request.cookies)
    print("ORDER COOKIES:", request.cookies)
    
    
    user = get_current_user_optional(
        access_token=request.cookies.get("access_token"),
        db=db
    )
    if not user:
        raise HTTPException(status_code=401, detail="Please login to place order")

    order = Order(
        user_id=user.id,
        total_amount=data.total_amount,
        status="pending"
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    for item in data.items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            product_name=item.product_name,
            price=item.price,
            quantity=item.quantity,
            image=item.image
        )
        db.add(order_item)

    db.commit()
    return {"message": "Order placed successfully", "order_id": order.id}

@app.get("/api/orders/my")
async def my_orders(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_optional(
        access_token=request.cookies.get("access_token"),
        db=db
    )
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    orders = db.query(Order).filter(Order.user_id == user.id).order_by(Order.created_at.desc()).all()
    result = []
    for order in orders:
        items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
        result.append({
            "id": order.id,
            "total_amount": order.total_amount,
            "status": order.status,
            "created_at": order.created_at,
            "items": [{"product_name": i.product_name, "price": i.price, "quantity": i.quantity, "image": i.image} for i in items]
        })
    return result

# ─── API: SUBSCRIBE ───
@app.post("/api/subscribe")
async def subscribe(data: SubscribeRequest):
    email = data.email.strip().lower()
    if email and email not in subscribers:
        subscribers.append(email)
    return {"message": "Subscribed successfully", "email": email}

# ─── API: PRODUCTS ───
@app.get("/api/products")
async def get_products():
    return {
        "products": [
            {"id": 1,
              "name": "Midnight Espresso",
                "description": "Bold, intense, with notes of dark chocolate and caramel.",
                  "price": 32, 
                  "rating": 4.9, 
                  "image": "/static/images/coffee-1.jpg",
                    "category": "espresso", "badge": "Best Seller", 
                    "flavorNotes": ["Dark Chocolate", "Caramel", "Walnut"]},

            {"id": 2,
              "name": "Ethiopian Reserve",
                "description": "Fruity and floral with hints of bergamot and jasmine.",
                  "price": 38,
               "rating": 4.8,
              "image": "/static/images/coffee-2.jpg",
              "category": "espresso",
            "badge": "Single Origin",
            "flavorNotes": ["Bergamot", "Jasmine", "Blueberry"]},
            {"id": 3, "name": "Cold Brew Blend", "description": "Smooth, naturally sweet with subtle nutty undertones.", "price": 28, "rating": 4.7, "image": "/static/images/coffee-3.jpg", "category": "cold-brew", "badge": "New Arrival", "flavorNotes": ["Hazelnut", "Cocoa", "Honey"]},
            {"id": 4, "name": "Velvet Cappuccino", "description": "Creamy, balanced perfection with velvety microfoam.", "price": 34, "rating": 4.9, "image": "/static/images/coffee-4.jpg", "category": "cappuccino", "badge": "Popular", "flavorNotes": ["Cream", "Toasted Almond", "Brown Sugar"]},
            {"id": 5, "name": "Vanilla Cloud Latte", "description": "Silky smooth with Madagascar vanilla.", "price": 30, "rating": 4.6, "image": "/static/images/coffee-5.jpg", "category": "latte", "flavorNotes": ["Vanilla", "Caramel", "Milk Chocolate"]},
            {"id": 6, "name": "Double Shot Ristretto", "description": "Concentrated intensity with thick crema.", "price": 36, "rating": 4.8, "image": "/static/images/coffee-6.jpg", "category": "espresso", "badge": "Staff Pick", "flavorNotes": ["Dark Cherry", "Tobacco", "Molasses"]},
            {"id": 7, "name": "Nitro Cold Brew", "description": "Cascading creamy nitrogen-infused coffee.", "price": 32, "rating": 4.7, "image": "/static/images/coffee-7.jpg", "category": "cold-brew", "badge": "Limited Edition", "flavorNotes": ["Cream", "Stone Fruit", "Citrus"]},
            {"id": 8, "name": "Mocha Indulgence", "description": "Espresso with Belgian chocolate and milk.", "price": 34, "rating": 4.5, "image": "/static/images/coffee-8.jpg", "category": "latte", "flavorNotes": ["Chocolate", "Espresso", "Cream"]},
            {"id": 9, "name": "Classic Cappuccino", "description": "Traditional Italian-style cappuccino.", "price": 28, "rating": 4.6, "image": "/static/images/coffee-4.jpg", "category": "cappuccino", "flavorNotes": ["Cocoa", "Nutty", "Caramel"]},
            {"id": 10, "name": "Caramel Macchiato", "description": "Vanilla, espresso and caramel layers.", "price": 32, "rating": 4.7, "image": "/static/images/coffee-5.jpg", "category": "latte", "badge": "Customer Favorite", "flavorNotes": ["Caramel", "Vanilla", "Toffee"]},
            {"id": 11, "name": "Japanese Cold Brew", "description": "12-hour Kyoto slow drip method.", "price": 40, "rating": 4.9, "image": "/static/images/coffee-7.jpg", "category": "cold-brew", "badge": "Premium", "flavorNotes": ["Blackcurrant", "Grapefruit", "Floral"]},
            {"id": 12, "name": "Hazelnut Latte", "description": "Espresso with roasted hazelnut flavor.", "price": 30, "rating": 4.5, "image": "/static/images/coffee-5.jpg", "category": "latte", "flavorNotes": ["Hazelnut", "Vanilla", "Cream"]}
        ]
    }

# ─── API: CART ───
@app.get("/api/cart")
async def get_cart():
    total = sum(i["price"] * i["quantity"] for i in cart)
    return {"items": cart, "total": round(total, 2), "totalItems": sum(i["quantity"] for i in cart)}

@app.post("/api/cart/add")
async def add_to_cart(item: CartItemRequest):
    existing = next((i for i in cart if i["id"] == item.id), None)
    if existing:
        existing["quantity"] += 1
    else:
        cart.append(item.model_dump())
    total = sum(i["price"] * i["quantity"] for i in cart)
    return {"message": "Added to cart", "cart": cart, "total": round(total, 2)}

@app.delete("/api/cart/{item_id}")
async def remove_from_cart(item_id: int):
    global cart
    cart = [i for i in cart if i["id"] != item_id]
    total = sum(i["price"] * i["quantity"] for i in cart)
    return {"message": "Removed", "cart": cart, "total": round(total, 2)}

@app.delete("/api/cart")
async def clear_cart():
    global cart
    cart = []
    return {"message": "Cart cleared"}

@app.patch("/api/cart/{item_id}")
async def update_cart(item_id: int, quantity: int):
    item = next((i for i in cart if i["id"] == item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if quantity <= 0:
        cart.remove(item)
    else:
        item["quantity"] = quantity
    total = sum(i["price"] * i["quantity"] for i in cart)
    return {"message": "Updated", "cart": cart, "total": round(total, 2)}

# ─── RUN ───
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)




app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173",
        "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)    



load_dotenv()

# Gemini Client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

class ChatRequest(BaseModel):
    message: str


@app.post("/api/chat")
async def chat(data: ChatRequest):
    prompt = f"""
You are NOIR BREW's official AI assistant.
reply short not more than 5 line in usual , if needed then exeed.

About NOIR BREW:
- Premium coffee brand.
- Specializes in artisan coffee.
- Offers espresso, cappuccino, latte, cold brew, and specialty blends.
- Provides coffee subscriptions, café experiences, and online ordering.
- Friendly and professional tone.
- Always answer from the perspective of NOIR BREW.
- If asked about coffee, explain NOIR BREW's coffee offerings first.
- If asked about services, explain NOIR BREW services.
- Do not act like a general-purpose assistant unless the question is unrelated.

Services:
- Café dining
- Coffee subscriptions
- Online ordering
- Event catering

Opening Hours:
- Monday-Sunday: 8 AM - 10 PM

Contact:
- support@noirbrew.com

    id: 1,
    name: "Midnight Espresso",
    desc: "Bold, intense, with notes of dark chocolate and caramel.",
    price: 32,
    rating: 4.9,
    image: "/static/images/coffee-1.jpg",
    category: "espresso",
    badge: "Best Seller",
  
  
    id: 2,
    name: "Ethiopian Reserve",
    desc: "Fruity and floral with hints of bergamot and jasmine.",
    price: 38,
    rating: 4.8,
    image: "/static/images/coffee-2.jpg",
    category: "espresso",
    badge: "Single Origin",
  
    id: 3,
    name: "Cold Brew Blend",
    desc: "Smooth, naturally sweet with subtle nutty undertones.",
    price: 28,
    rating: 4.7,
    image: "/static/images/coffee-3.jpg",
    category: "cold-brew",
    badge: "New Arrival",
  
    id: 4,
    name: "Velvet Cappuccino",
    desc: "Creamy, balanced perfection with velvety microfoam.",
    price: 34,
    rating: 4.9,
    image: "/static/images/coffee-4.jpg",
    category: "cappuccino",
    badge: "Popular",
  
    id: 5,
    name: "Vanilla Cloud Latte",
    desc: "Silky smooth with Madagascar vanilla.",
    price: 30,
    rating: 4.6,
    image: "/static/images/coffee-5.jpg",
    category: "latte",
 
    id: 6,
    name: "Double Shot Ristretto",
    desc: "Concentrated intensity with thick crema.",
    price: 36,
    rating: 4.8,
    image: "/static/images/coffee-6.jpg",
    category: "espresso",
    badge: "Staff Pick",
  
    id: 7,
    name: "Nitro Cold Brew",
    desc: "Cascading creamy nitrogen-infused coffee.",
    price: 32,
    rating: 4.7,
    image: "/static/images/coffee-7.jpg",
    category: "cold-brew",
    badge: "Limited Edition",
  
    id: 8,
    name: "Mocha Indulgence",
    desc: "Espresso with Belgian chocolate and milk.",
    price: 34,
    rating: 4.5,
    image: "/static/images/coffee-8.jpg",
    category: "latte",
  
    id: 9,
    name: "Classic Cappuccino",
    desc: "Traditional Italian-style cappuccino.",
    price: 28,
    rating: 4.6,
    image: "/static/images/coffee-4.jpg",
    category: "cappuccino",
  
    id: 10,
    name: "Caramel Macchiato",
    desc: "Vanilla, espresso and caramel layers.",
    price: 32,
    rating: 4.7,
    image: "/static/images/coffee-5.jpg",
    category: "latte",
    badge: "Customer Favorite",
  
    id: 11,
    name: "Japanese Cold Brew",
    desc: "12-hour Kyoto slow drip method.",
    price: 40,
    rating: 4.9,
    image: "/static/images/coffee-7.jpg",
    category: "cold-brew",
    badge: "Premium",
  id: 12,
    name: "Hazelnut Latte",
    desc: "Espresso with roasted hazelnut flavor.",
    price: 30,
    rating: 4.5,
    image: "/static/images/coffee-5.jpg",
    category: "latte",
  

Customer Question:
{data.message}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        
    )

    return {
        "reply": response.text
    }




# from fastapi import FastAPI, HTTPException, Request
# from fastapi.staticfiles import StaticFiles
# from fastapi.templating import Jinja2Templates
# from fastapi.responses import HTMLResponse, FileResponse
# from pydantic import BaseModel
# import uvicorn

# app = FastAPI(title="NOIR BREW")

# app.mount("/static", StaticFiles(directory="static"), name="static")
# templates = Jinja2Templates(directory="templates")

# subscribers = []
# cart = []


# # ─── MODELS ───
# class SubscribeRequest(BaseModel):
#     email: str

# class CartItemRequest(BaseModel):
#     id: int
#     name: str
#     price: float
#     image: str
#     category: str
#     quantity: int = 1


# # ─── PAGES ───
# @app.get("/", response_class=HTMLResponse)
# async def home(request: Request):
#     # return templates.TemplateResponse("index.html", {"request": request})
#     return templates.TemplateResponse(request=request, name="index.html")


# # @app.get("/shop")
# # async def shop():
# #     return FileResponse("templates/shop.html")
# @app.get("/shop", response_class=HTMLResponse)
# async def shop(request: Request):
#     return templates.TemplateResponse(request=request, name="shop.html")


# # ─── API: SUBSCRIBE ───
# @app.post("/api/subscribe")
# async def subscribe(data: SubscribeRequest):
#     email = data.email.strip().lower()
#     if email and email not in subscribers:
#         subscribers.append(email)
#     return {"message": "Subscribed successfully", "email": email}


# # ─── API: PRODUCTS (FULL ORIGINAL STYLE) ───
# @app.get("/api/products")
# async def get_products():
#     return {
#         "products": [
#             {
#                 "id": 1,
#                 "name": "Midnight Espresso",
#                 "description": "Bold, intense, with notes of dark chocolate and caramel.",
#                 "price": 32,
#                 "rating": 4.9,
#                 "image": "/static/images/coffee-1.jpg",
#                 "category": "espresso",
#                 "badge": "Best Seller",
#                 "flavorNotes": ["Dark Chocolate", "Caramel", "Walnut"]
#             },
#             {
#                 "id": 2,
#                 "name": "Ethiopian Reserve",
#                 "description": "Fruity and floral with hints of bergamot and jasmine.",
#                 "price": 38,
#                 "rating": 4.8,
#                 "image": "/static/images/coffee-2.jpg",
#                 "category": "espresso",
#                 "badge": "Single Origin",
#                 "flavorNotes": ["Bergamot", "Jasmine", "Blueberry"]
#             },
#             {
#                 "id": 3,
#                 "name": "Cold Brew Blend",
#                 "description": "Smooth, naturally sweet with subtle nutty undertones.",
#                 "price": 28,
#                 "rating": 4.7,
#                 "image": "/static/images/coffee-3.jpg",
#                 "category": "cold-brew",
#                 "badge": "New Arrival",
#                 "flavorNotes": ["Hazelnut", "Cocoa", "Honey"]
#             },
#             {
#                 "id": 4,
#                 "name": "Velvet Cappuccino",
#                 "description": "Creamy, balanced perfection with velvety microfoam.",
#                 "price": 34,
#                 "rating": 4.9,
#                 "image": "/static/images/coffee-4.jpg",
#                 "category": "cappuccino",
#                 "badge": "Popular",
#                 "flavorNotes": ["Cream", "Toasted Almond", "Brown Sugar"]
#             },
#             {
#                 "id": 5,
#                 "name": "Vanilla Cloud Latte",
#                 "description": "Silky smooth with Madagascar vanilla.",
#                 "price": 30,
#                 "rating": 4.6,
#                 "image": "/static/images/coffee-5.jpg",
#                 "category": "latte",
#                 "flavorNotes": ["Vanilla", "Caramel", "Milk Chocolate"]
#             },
#             {
#                 "id": 6,
#                 "name": "Double Shot Ristretto",
#                 "description": "Concentrated intensity with thick crema.",
#                 "price": 36,
#                 "rating": 4.8,
#                 "image": "/static/images/coffee-6.jpg",
#                 "category": "espresso",
#                 "badge": "Staff Pick",
#                 "flavorNotes": ["Dark Cherry", "Tobacco", "Molasses"]
#             },
#             {
#                 "id": 7,
#                 "name": "Nitro Cold Brew",
#                 "description": "Cascading creamy nitrogen-infused coffee.",
#                 "price": 32,
#                 "rating": 4.7,
#                 "image": "/static/images/coffee-7.jpg",
#                 "category": "cold-brew",
#                 "badge": "Limited Edition",
#                 "flavorNotes": ["Cream", "Stone Fruit", "Citrus"]
#             },
#             {
#                 "id": 8,
#                 "name": "Mocha Indulgence",
#                 "description": "Espresso with Belgian chocolate and milk.",
#                 "price": 34,
#                 "rating": 4.5,
#                 "image": "/static/images/coffee-8.jpg",
#                 "category": "latte",
#                 "flavorNotes": ["Chocolate", "Espresso", "Cream"]
#             },
#             {
#                 "id": 9,
#                 "name": "Classic Cappuccino",
#                 "description": "Traditional Italian-style cappuccino.",
#                 "price": 28,
#                 "rating": 4.6,
#                 "image": "/static/images/coffee-4.jpg",
#                 "category": "cappuccino",
#                 "flavorNotes": ["Cocoa", "Nutty", "Caramel"]
#             },
#             {
#                 "id": 10,
#                 "name": "Caramel Macchiato",
#                 "description": "Vanilla, espresso and caramel layers.",
#                 "price": 32,
#                 "rating": 4.7,
#                 "image": "/static/images/coffee-5.jpg",
#                 "category": "latte",
#                 "badge": "Customer Favorite",
#                 "flavorNotes": ["Caramel", "Vanilla", "Toffee"]
#             },
#             {
#                 "id": 11,
#                 "name": "Japanese Cold Brew",
#                 "description": "12-hour Kyoto slow drip method.",
#                 "price": 40,
#                 "rating": 4.9,
#                 "image": "/static/images/coffee-7.jpg",
#                 "category": "cold-brew",
#                 "badge": "Premium",
#                 "flavorNotes": ["Blackcurrant", "Grapefruit", "Floral"]
#             },
#             {
#                 "id": 12,
#                 "name": "Hazelnut Latte",
#                 "description": "Espresso with roasted hazelnut flavor.",
#                 "price": 30,
#                 "rating": 4.5,
#                 "image": "/static/images/coffee-5.jpg",
#                 "category": "latte",
#                 "flavorNotes": ["Hazelnut", "Vanilla", "Cream"]
#             }
#         ]
#     }


# # ─── API: CART ───
# @app.get("/api/cart")
# async def get_cart():
#     total = sum(i["price"] * i["quantity"] for i in cart)
#     return {
#         "items": cart,
#         "total": round(total, 2),
#         "totalItems": sum(i["quantity"] for i in cart)
#     }


# @app.post("/api/cart/add")
# async def add_to_cart(item: CartItemRequest):
#     existing = next((i for i in cart if i["id"] == item.id), None)

#     if existing:
#         existing["quantity"] += 1
#     else:
#         cart.append(item.model_dump())

#     total = sum(i["price"] * i["quantity"] for i in cart)
#     return {"message": "Added to cart", "cart": cart, "total": round(total, 2)}


# @app.delete("/api/cart/{item_id}")
# async def remove_from_cart(item_id: int):
#     global cart
#     cart = [i for i in cart if i["id"] != item_id]
#     total = sum(i["price"] * i["quantity"] for i in cart)
#     return {"message": "Removed", "cart": cart, "total": round(total, 2)}


# @app.delete("/api/cart")
# async def clear_cart():
#     global cart
#     cart = []
#     return {"message": "Cart cleared"}


# @app.patch("/api/cart/{item_id}")
# async def update_cart(item_id: int, quantity: int):
#     item = next((i for i in cart if i["id"] == item_id), None)

#     if not item:
#         raise HTTPException(status_code=404, detail="Item not found")

#     if quantity <= 0:
#         cart.remove(item)
#     else:
#         item["quantity"] = quantity

#     total = sum(i["price"] * i["quantity"] for i in cart)
#     return {"message": "Updated", "cart": cart, "total": round(total, 2)}


# # ─── RUN ───
# if __name__ == "__main__":
#     uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)


   
