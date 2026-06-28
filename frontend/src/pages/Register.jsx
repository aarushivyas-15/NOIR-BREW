import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async () => {
    const { name, email, password, confirm } = form;

    if (!name || !email || !password || !confirm)
      return setError("Fill in all fields");
    if (password !== confirm) return setError("Passwords do not match");
    if (password.length < 6)
      return setError("Password too short (min 6 chars)");

    setLoading(true);
    setError("");

    const res = await register(name, email, password);
    if (res.success) {
      navigate("/login");
    } else {
      setError(res.error || "Registration failed");
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    height: "3rem",
    padding: "0 1rem",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    outline: "none",
    background: "var(--background)",
    border: "1px solid var(--border)",
    color: "var(--foreground)",
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
            Create your account
          </p>
        </div>

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
            Sign Up
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
            {[
              {
                label: "Full Name",
                field: "name",
                type: "text",
                placeholder: "John Doe",
              },
              {
                label: "Email",
                field: "email",
                type: "email",
                placeholder: "hello@example.com",
              },
              {
                label: "Password",
                field: "password",
                type: "password",
                placeholder: "••••••••",
              },
              {
                label: "Confirm Password",
                field: "confirm",
                type: "password",
                placeholder: "••••••••",
              },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--foreground)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  value={form[field]}
                  onChange={update(field)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder={placeholder}
                  style={inputStyle}
                />
              </div>
            ))}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                height: "3rem",
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                fontWeight: 500,
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Creating account..." : "Create Account"}
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
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "var(--primary)", fontWeight: 500 }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
