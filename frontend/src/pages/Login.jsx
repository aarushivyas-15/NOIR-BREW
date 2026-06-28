import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        background: "var(--background)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "28rem" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link
            to="/"
            style={{
              fontSize: "1.875rem",
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              textDecoration: "none",
              color: "var(--foreground)",
            }}
          >
            NOIR<span style={{ color: "var(--primary)" }}>BREW</span>
          </Link>
          <p style={{ color: "var(--muted-foreground)", marginTop: "0.5rem" }}>
            Welcome back
          </p>
        </div>

        {/* Card */}
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
            Sign In
          </h2>

          {error && (
            <div
              style={{
                marginBottom: "1rem",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                background: "color-mix(in oklch, red 15%, transparent)",
                color: "red",
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--foreground)",
                  marginBottom: "0.5rem",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="hello@example.com"
                style={{
                  width: "100%",
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  height: "3rem",
                  padding: "0 1rem",
                  borderRadius: "0.5rem",
                  outline: "none",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--foreground)",
                  marginBottom: "0.5rem",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  height: "3rem",
                  padding: "0 1rem",
                  borderRadius: "0.5rem",
                  outline: "none",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: "100%",
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                height: "3rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 500,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
              marginTop: "1.5rem",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "var(--primary)", fontWeight: 500 }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
