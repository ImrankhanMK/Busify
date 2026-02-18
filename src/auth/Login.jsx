import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { supabase } from "../services/supabaseClient";
import "../css/login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
console.log("Form submitted")
  if (!email || !password) return alert("Please fill all fields");

  try {
    alert("welcome")

  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Unexpected error occurred. Check console.");
  }
};

  return (
    <div className="login-wrapper">
      <div className="login-card shadow-lg">
        <div className="login-image">
          <div className="overlay-text">
            <h4>TRAVEL IS THE ONLY THING</h4>
            <h4>YOU BUY THAT MAKES YOU</h4>
            <h3>RICHER</h3>
          </div>
        </div>

        <div className="login-form p-5">
          <h3 className="text-center mb-4">Busify Login</h3>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary w-100">
              Log In
            </button>
          </form>

          <hr />

          <div className="d-flex justify-content-between">
            <button className="btn btn-success" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
            <button className="btn btn-primary" onClick={() => navigate("/admin-login")}>
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
