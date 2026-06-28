import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const allProducts = [
  {
    id: 1,
    name: "Midnight Espresso",
    desc: "Bold, intense, with notes of dark chocolate and caramel.",
    price: 32,
    rating: 4.9,
    image: "/static/images/coffee-1.jpg",
    category: "espresso",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Ethiopian Reserve",
    desc: "Fruity and floral with hints of bergamot and jasmine.",
    price: 38,
    rating: 4.8,
    image: "/static/images/coffee-2.jpg",
    category: "espresso",
    badge: "Single Origin",
  },
  {
    id: 3,
    name: "Cold Brew Blend",
    desc: "Smooth, naturally sweet with subtle nutty undertones.",
    price: 28,
    rating: 4.7,
    image: "/static/images/coffee-3.jpg",
    category: "cold-brew",
    badge: "New Arrival",
  },
  {
    id: 4,
    name: "Velvet Cappuccino",
    desc: "Creamy, balanced perfection with velvety microfoam.",
    price: 34,
    rating: 4.9,
    image: "/static/images/coffee-4.jpg",
    category: "cappuccino",
    badge: "Popular",
  },
  {
    id: 5,
    name: "Vanilla Cloud Latte",
    desc: "Silky smooth with Madagascar vanilla.",
    price: 30,
    rating: 4.6,
    image: "/static/images/coffee-5.jpg",
    category: "latte",
  },
  {
    id: 6,
    name: "Double Shot Ristretto",
    desc: "Concentrated intensity with thick crema.",
    price: 36,
    rating: 4.8,
    image: "/static/images/coffee-6.jpg",
    category: "espresso",
    badge: "Staff Pick",
  },
  {
    id: 7,
    name: "Nitro Cold Brew",
    desc: "Cascading creamy nitrogen-infused coffee.",
    price: 32,
    rating: 4.7,
    image: "/static/images/coffee-7.jpg",
    category: "cold-brew",
    badge: "Limited Edition",
  },
  {
    id: 8,
    name: "Mocha Indulgence",
    desc: "Espresso with Belgian chocolate and milk.",
    price: 34,
    rating: 4.5,
    image: "/static/images/coffee-8.jpg",
    category: "latte",
  },
  {
    id: 9,
    name: "Classic Cappuccino",
    desc: "Traditional Italian-style cappuccino.",
    price: 28,
    rating: 4.6,
    image: "/static/images/coffee-4.jpg",
    category: "cappuccino",
  },
  {
    id: 10,
    name: "Caramel Macchiato",
    desc: "Vanilla, espresso and caramel layers.",
    price: 32,
    rating: 4.7,
    image: "/static/images/coffee-5.jpg",
    category: "latte",
    badge: "Customer Favorite",
  },
  {
    id: 11,
    name: "Japanese Cold Brew",
    desc: "12-hour Kyoto slow drip method.",
    price: 40,
    rating: 4.9,
    image: "/static/images/coffee-7.jpg",
    category: "cold-brew",
    badge: "Premium",
  },
  {
    id: 12,
    name: "Hazelnut Latte",
    desc: "Espresso with roasted hazelnut flavor.",
    price: 30,
    rating: 4.5,
    image: "/static/images/coffee-5.jpg",
    category: "latte",
  },
];

const categories = ["all", "espresso", "cappuccino", "latte", "cold-brew"];

export default function Shop() {
  const { addToCart, setIsOpen } = useCart();
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === active);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Cart />

      <header className="shop-header">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span className="text-sm">Back to Home</span>
            </Link>

            <Link
              to="/"
              className="text-2xl font-serif font-bold text-foreground"
            >
              NOIR<span className="text-primary">BREW</span>
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              style={{
                position: "relative",
                padding: "0.5rem",
                borderRadius: "9999px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.querySelector("svg").style.stroke =
                  "var(--primary)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.querySelector("svg").style.stroke =
                  "var(--foreground)")
              }
            >
              <svg
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  display: "block",
                  stroke: "var(--foreground)",
                }}
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* hero */}
      <section
        className="relative py-15 overflow-hidden"
        style={{ paddingTop: "5rem", paddingBottom: "3rem" }}
      >
        <div className="container mx-auto px-2 relative">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-primary font-medium tracking-[0.1rem] uppercase text-sm ">
              Premium Collection
            </p>
            <h1
              className="text-4xl font-serif font-bold text-foreground mb-6"
              style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
            >
              Explore Our Coffee
            </h1>
            {/* <h1 className="text-4xl font-serif font-bold text-foreground mb-6">
              Explore Our Coffee
            </h1> */}
            {/* <h1
              class="text-4xl font-serif font-bold text-foreground mb-6"
              style={{font-size: "clamp(2rem, 5vw, 3.75rem)"}}
            > */}
            {/* Explore Our Coffee
            </h1> */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xxl mx-auto">
              Discover our curated selection of premium coffees, from bold
              espressos to smooth cold brews.Each blend is crafted for
              perfection.
            </p>
          </div>
        </div>
      </section>

      {/* filters */}
      <section
        className="border-b py-4"
        style={{
          position: "sticky",
          top: "57px",
          zIndex: 30,
          backgroundColor:
            "color-mix(in oklch, var(--background) 95%, transparent)",
          backdropFilter: "blur(24px)",
          borderColor: "color-mix(in oklch, var(--border) 50%, transparent)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`category-btn ${active === cat ? "active" : ""}`}
                >
                  {cat === "all"
                    ? "All Products"
                    : cat.charAt(0).toUpperCase() +
                      cat.slice(1).replace("-", " ")}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="text-foreground font-medium">
                {filtered.length}
              </span>{" "}
              products
            </p>
          </div>
        </div>
      </section>

      {/* products grid */}
      <section style={{ padding: "3rem 0 5rem" }}>
        <div className="container mx-auto px-6">
          <div
            id="products-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filtered.map((p) => (
              <div key={p.id} className="product-card-shop group">
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 700ms",
                    }}
                    className="group-hover:scale-110"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, var(--card), transparent, transparent)",
                    }}
                  />
                  {p.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        background:
                          "color-mix(in oklch, var(--primary) 90%, transparent)",
                        color: "var(--primary-foreground)",
                        padding: "0.25rem 0.75rem",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        borderRadius: "9999px",
                      }}
                    >
                      {p.badge}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      addToCart(p);
                      setIsOpen(true);
                    }}
                    className="quick-add-btn"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--primary)",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {p.category.replace("-", " ")}
                    </span>
                    <div className="flex items-center gap-1">
                      <svg
                        style={{
                          width: "0.875rem",
                          height: "0.875rem",
                          fill: "var(--primary)",
                        }}
                        viewBox="0 0 24 24"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        {p.rating}
                      </span>
                    </div>
                  </div>
                  <h3
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "var(--foreground)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {p.name}
                  </h3>
                  <p
                    style={{
                      color: "var(--muted-foreground)",
                      fontSize: "0.875rem",
                      marginBottom: "1rem",
                      lineHeight: 1.625,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "0.5rem",
                      borderTop:
                        "1px solid color-mix(in oklch, var(--border) 50%, transparent)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--foreground)",
                      }}
                    >
                      ${p.price}
                    </span>
                    {/* <button
                      onClick={() => {
                        addToCart(p);
                        setIsOpen(true);
                      }}
                      className="btn-add-to-cart"
                    >
                      Add
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
