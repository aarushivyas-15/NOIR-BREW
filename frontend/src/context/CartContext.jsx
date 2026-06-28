import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0),
    );
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isOpen,
        setIsOpen,
        addToCart,
        removeItem,
        updateQty,
        clearCart,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

// import { createContext, useContext, useState } from "react";

// const CartContext = createContext(null);

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);

//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const existing = prev.find((i) => i.id === product.id);
//       if (existing) {
//         return prev.map((i) =>
//           i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//     setIsOpen(true);
//   };

//   const removeItem = (id) => {
//     setCartItems((prev) => prev.filter((i) => i.id !== id));
//   };

//   const updateQty = (id, delta) => {
//     setCartItems((prev) => {
//       return prev
//         .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
//         .filter((i) => i.quantity > 0);
//     });
//   };

//   const clearCart = () => setCartItems([]);

//   const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
//   const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         isOpen,
//         setIsOpen,
//         addToCart,
//         removeItem,
//         updateQty,
//         clearCart,
//         total,
//         totalItems,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }
