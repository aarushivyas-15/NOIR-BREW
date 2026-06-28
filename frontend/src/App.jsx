import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<h1>Home</h1>} />
//         <Route path="/shop" element={<h1>Shop</h1>} />
//         <Route path="/login" element={<h1>Login</h1>} />
//         <Route path="/register" element={<h1>Register</h1>} />
//         <Route path="/profile" element={<h1>Profile</h1>} />
//       </Routes>
//     </BrowserRouter>

//   );
// }

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import FAQChatPage from "./pages/FAQChatPage.jsx";
import OrderConfirm from "./pages/OrderConfirm.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/FAQChatPage" element={<FAQChatPage />} />
            <Route path="/OrderConfirm" element={<OrderConfirm />} />
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
