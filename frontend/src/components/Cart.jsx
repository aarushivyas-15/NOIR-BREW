import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    isOpen,
    setIsOpen,
    removeItem,
    updateQty,
    clearCart,
    total,
    totalItems,
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const placeOrder = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsOpen(false);
    navigate("/OrderConfirm");
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{
          background: "color-mix(in oklch, var(--background) 80%, transparent)",
          backdropFilter: "blur(4px)",
        }}
      />

      <div
        className="fixed right-0 top-0 h-full flex flex-col z-50 transition-transform duration-300 ease-out"
        style={{
          width: "100%",
          maxWidth: "28rem",
          background: "var(--card)",
          borderLeft: "1px solid var(--border)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <h2 className="text-xl font-serif font-semibold text-foreground">
              Your Cart
            </h2>
            <span className="bg-primary/20 text-primary text-sm px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              padding: "0.5rem",
              borderRadius: "9999px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.querySelector("svg").style.stroke =
                "var(--primary)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.querySelector("svg").style.stroke =
                "var(--muted-foreground)")
            }
          >
            <svg
              style={{
                width: "1.25rem",
                height: "1.25rem",
                stroke: "var(--muted-foreground)",
                transition: "stroke 300ms",
              }}
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                className="w-16 h-16 mb-4"
                style={{ color: "var(--muted-foreground)", opacity: 0.3 }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Discover our premium coffee collection.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl border"
                  style={{
                    background:
                      "color-mix(in oklch, var(--muted) 30%, transparent)",
                    borderColor:
                      "color-mix(in oklch, var(--border) 50%, transparent)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {item.category}
                    </p>
                    <p
                      className="font-semibold mt-1"
                      style={{ color: "var(--primary)" }}
                    >
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                      </svg>
                    </button>
                    <div
                      className="flex items-center gap-2 rounded-lg"
                      style={{ background: "var(--muted)" }}
                    >
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="p-1.5 text-foreground hover:bg-background rounded-l-lg transition-colors"
                      >
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="p-1.5 text-foreground hover:bg-background rounded-r-lg transition-colors"
                      >
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-border">
              <span className="text-lg font-semibold text-foreground">
                Total
              </span>
              <span className="text-xl font-bold text-primary">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={placeOrder}
              className="w-full py-4 text-base font-medium rounded-lg transition-all duration-300"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {user ? "Place Order" : "Login to Checkout"}
            </button>

            <button
              onClick={clearCart}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
