import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const orderTypes = [
  { id: "dine-in", label: "Dine In", icon: "🪑", desc: "Enjoy at our café" },
  { id: "takeaway", label: "Takeaway", icon: "☕", desc: "Pick up your order" },
  { id: "delivery", label: "Delivery", icon: "🛵", desc: "Get it delivered" },
];

export default function OrderConfirm() {
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orderType, setOrderType] = useState(null);
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);
  const [note, setNote] = useState("");

  const handleConfirm = async () => {
    if (!orderType) return alert("Please select order type");

    if (orderType === "delivery" && !address.trim()) {
      return alert("Please enter delivery address");
    }

    setPlacing(true);

    try {
      console.log("Sending request to: http://localhost:8000/api/orders");

      const res = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          items: cartItems.map((i) => ({
            product_id: i.id,
            product_name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
          total_amount: total,
          order_type: orderType,
          note: note,
          delivery_address: address,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.log("Backend Error:", errorText);
        throw new Error(`Order failed: ${res.status}`);
      }

      const data = await res.json();

      console.log("Order Success Data:", data);
      navigate(`/order-success/${data.order_id}`);

      setTimeout(() => {
        clearCart();
      }, 100);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ paddingBottom: "4rem" }}
    >
      {/* header */}
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "1rem 1.5rem",
          position: "sticky",
          top: 0,
          background: "var(--background)",
          zIndex: 10,
        }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            style={{ background: "none", border: "none", cursor: "pointer" }}
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
            <span className="text-sm">Back</span>
          </button>
          <span className="font-serif font-bold text-lg">
            NOIR<span style={{ color: "var(--primary)" }}>BREW</span>
          </span>
          <div style={{ width: "4rem" }} />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 pt-8">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
          Confirm Order
        </h1>
        <p className="text-muted-foreground mb-8">
          Review your items and choose how you want it
        </p>

        {/* order items */}
        <div
          className="rounded-2xl border border-border overflow-hidden mb-6"
          style={{ background: "var(--card)" }}
        >
          <div className="px-5 py-4 border-b border-border">
            <p className="font-medium text-foreground">Your Items</p>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 px-5 py-4 border-b border-border/50"
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  borderRadius: "0.5rem",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  x{item.quantity}
                </p>
              </div>
              <p className="font-semibold text-foreground">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="px-5 py-4 flex justify-between items-center">
            <span className="text-muted-foreground">Total</span>
            <span
              className="text-xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* order type */}
        <div className="mb-6">
          <p className="font-medium text-foreground mb-3">
            How would you like it?
          </p>
          <div className="grid grid-cols-3 gap-3">
            {orderTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setOrderType(type.id)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200"
                style={{
                  background:
                    orderType === type.id
                      ? "color-mix(in oklch, var(--primary) 15%, var(--card))"
                      : "var(--card)",
                  borderColor:
                    orderType === type.id ? "var(--primary)" : "var(--border)",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "1.75rem" }}>{type.icon}</span>
                <span className="font-medium text-sm text-foreground">
                  {type.label}
                </span>
                <span className="text-xs text-muted-foreground text-center">
                  {type.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* delivery address */}
        {orderType === "delivery" && (
          <div className="mb-6">
            <p className="font-medium text-foreground mb-3">Delivery Address</p>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address..."
              className="w-full px-4 h-12 rounded-xl border border-border text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary"
              style={{ background: "var(--card)", boxSizing: "border-box" }}
            />
          </div>
        )}

        {/* note */}
        <div className="mb-8">
          <p className="font-medium text-foreground mb-3">
            Special Instructions{" "}
            <span className="text-muted-foreground font-normal text-sm">
              (optional)
            </span>
          </p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. extra shot, oat milk, no sugar..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-border text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary resize-none"
            style={{
              background: "var(--card)",
              boxSizing: "border-box",
              width: "100%",
            }}
          />
        </div>

        {/* confirm button */}
        <button
          onClick={handleConfirm}
          disabled={placing}
          className="w-full py-4 rounded-xl font-medium text-base transition-all duration-300"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "none",
            cursor: placing ? "not-allowed" : "pointer",
            opacity: placing ? 0.7 : 1,
          }}
        >
          {placing
            ? "Placing Order..."
            : `Confirm Order • $${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
