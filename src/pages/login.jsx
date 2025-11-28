import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { loginUser } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter Email & Password");
      return;
    }
    loginUser();
    navigate("/");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
      }}
    >
      <div
        className="card p-4 shadow-lg border-0"
        style={{
          width: "400px",
          borderRadius: "20px",
          background: "#ffffffcc",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 className="fw-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-muted mb-4">
          Login to continue shopping with us
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control p-3 shadow-sm"
              style={{ borderRadius: "12px" }}
              placeholder="yourname@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control p-3 shadow-sm"
              style={{ borderRadius: "12px" }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn w-100 py-2 fw-semibold mt-2 shadow-sm"
            style={{
              background: "#1976d2",
              color: "white",
              borderRadius: "30px",
              fontSize: "17px",
            }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <Link to="/register" className="fw-semibold" style={{ color: "#1976d2" }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
