import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      fetch("http://localhost:8000/api/orders/my", { credentials: "include" })
        .then((r) => r.json())
        .then(setOrders)
        .catch(() => {});
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading || !user) return null;

  const totalSpent = orders.reduce((s, o) => s + o.total_amount, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        paddingTop: "5rem",
      }}
    >
      {/* header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: "var(--background)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <nav
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: "1.5rem",
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              textDecoration: "none",
              color: "var(--foreground)",
            }}
          >
            NOIR<span style={{ color: "var(--primary)" }}>BREW</span>
          </Link>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link
              to="/shop"
              style={{
                fontSize: "0.875rem",
                color: "var(--muted-foreground)",
                textDecoration: "none",
              }}
            >
              Shop
            </Link>
            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                border: "1px solid var(--border)",
                color: "var(--muted-foreground)",
                background: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "red";
                e.currentTarget.style.borderColor = "red";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "var(--muted-foreground)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <div
        style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}
      >
        {/* profile card */}
        <div
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklch, var(--primary) 10%, var(--card)), var(--card))",
            border: "1px solid var(--border)",
            borderRadius: "1rem",
            padding: "2rem",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              width: "5rem",
              height: "5rem",
              borderRadius: "9999px",
              background: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "var(--primary-foreground)",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          <div>
            <h1
              style={{
                fontSize: "1.75rem",
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                color: "var(--foreground)",
              }}
            >
              {user?.name || ""}
            </h1>
            <p
              style={{ color: "var(--muted-foreground)", marginTop: "0.25rem" }}
            >
              {user?.email || ""}
            </p>
          </div>
        </div>

        {/* stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {[
            { label: "Total Orders", value: orders.length },
            { label: "Total Spent", value: `$${totalSpent.toFixed(2)}` },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                padding: "1.5rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "2rem",
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  color: "var(--primary)",
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--muted-foreground)",
                  marginTop: "0.25rem",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* orders */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "1rem",
            padding: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              color: "var(--foreground)",
              marginBottom: "1.5rem",
            }}
          >
            Order History
          </h2>

          {orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p
                style={{
                  color: "var(--muted-foreground)",
                  marginBottom: "1rem",
                }}
              >
                No orders yet
              </p>
              <Link
                to="/shop"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {orders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <p
                        style={{ fontWeight: 600, color: "var(--foreground)" }}
                      >
                        Order #{order.id}
                      </p>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        {new Date(order.created_at).toLocaleDateString(
                          "en-IN",
                          { day: "numeric", month: "long", year: "numeric" },
                        )}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          background:
                            order.status === "pending"
                              ? "color-mix(in oklch, orange 20%, transparent)"
                              : "color-mix(in oklch, green 20%, transparent)",
                          color:
                            order.status === "pending" ? "orange" : "green",
                        }}
                      >
                        {order.status}
                      </span>
                      <p style={{ fontWeight: 700, color: "var(--primary)" }}>
                        ${order.total_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {order.items?.map((item) => (
                    <div
                      key={item.product_name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                        marginTop: "0.5rem",
                        background:
                          "color-mix(in oklch, var(--muted) 30%, transparent)",
                      }}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.product_name}
                          style={{
                            width: "3rem",
                            height: "3rem",
                            borderRadius: "0.5rem",
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontWeight: 500,
                            color: "var(--foreground)",
                          }}
                        >
                          {item.product_name}
                        </p>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--muted-foreground)",
                          }}
                        >
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p
                        style={{ fontWeight: 600, color: "var(--foreground)" }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
