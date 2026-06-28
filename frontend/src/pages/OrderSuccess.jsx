import { useNavigate, useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* success icon */}
        <div
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{
            background: "color-mix(in oklch, var(--primary) 15%, transparent)",
          }}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-3xl font-serif font-bold text-foreground mb-3">
          Order Placed!
        </h1>
        <p className="text-muted-foreground mb-2">
          Your order #{orderId} has been confirmed.
        </p>
        <p className="text-muted-foreground mb-8">
          We'll have it ready for you shortly
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="w-full py-3 rounded-xl font-medium transition-all duration-300"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "none",
              cursor: "pointer",
            }}
          >
            View Order History
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-xl font-medium transition-all duration-300"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
