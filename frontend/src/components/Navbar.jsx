import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Help from "../pages/FAQChatPage.jsx";
export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        transition: "all 500ms",
        background: scrolled ? "var(--background)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-serif font-bold tracking-wider"
          style={{ color: "var(--foreground)", textDecoration: "none" }}
        >
          NOIR<span style={{ color: "var(--primary)" }}>BREW</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#products" className="nav-link">
            Products
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#gallery" className="nav-link">
            Gallery
          </a>
          <a href="#testimonials" className="nav-link">
            Testimonials
          </a>
          {/* <a href="/FAQChatPage" className="nav-link">
            Help
          </a> */}
          <Link to="/FAQChatPage" className="nav-link">
            Help
          </Link>

          <Link to="/shop" className="btn-outline-nav">
            Shop Now
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                <svg
                  style={{ width: "1rem", height: "1rem" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
              <button
                onClick={logout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  border: "1px solid var(--border)",
                  color: "var(--muted-foreground)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  background: "none",
                  cursor: "pointer",
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
                <svg
                  style={{ width: "1rem", height: "1rem" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              <svg
                style={{ width: "1rem", height: "1rem" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Login
            </Link>
          )}

          {/* Cart Button */}
          <button
            onClick={() => setIsOpen(true)}
            style={{
              position: "relative",
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
              (e.currentTarget.querySelector("svg").style.stroke = "white")
            }
          >
            <svg
              style={{
                width: "1.25rem",
                height: "1.25rem",
                display: "block",
                stroke: "white",
                transition: "stroke 300ms",
              }}
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  width: "1.25rem",
                  height: "1.25rem",
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-2"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: "4rem",
            background:
              "color-mix(in oklch, var(--background) 95%, transparent)",
            backdropFilter: "blur(24px)",
            zIndex: 39,
            opacity: mobileOpen ? 1 : 0,
            visibility: mobileOpen ? "visible" : "hidden",
            transition: "all 0.5s ease",
          }}
        >
          <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
            <a
              href="#products"
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: "1.125rem",
                fontWeight: 500,
                color: "var(--foreground)",
                textDecoration: "none",
              }}
            >
              Products
            </a>
            <a
              href="#about"
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: "1.125rem",
                fontWeight: 500,
                color: "var(--foreground)",
                textDecoration: "none",
              }}
            >
              About
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: "1.125rem",
                fontWeight: 500,
                color: "var(--foreground)",
                textDecoration: "none",
              }}
            >
              Gallery
            </a>
            <Link
              to="/shop"
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: "1.125rem",
                fontWeight: 500,
                color: "var(--foreground)",
                textDecoration: "none",
              }}
            >
              Shop
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    color: "var(--primary)",
                    textDecoration: "none",
                  }}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  style={{
                    textAlign: "left",
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    color: "red",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  color: "var(--foreground)",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
