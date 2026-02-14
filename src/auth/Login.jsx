import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import "../css/login.css"; 

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Login handler
 

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) return alert("Please fill all fields");

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !data) {
    return alert("Invalid email or password");
  }

  alert(`Welcome ${data.name}!`);
  navigate("/"); // or navigate based on role if you add a role column
};
  return (
  <div className="login-wrapper">
    <div className="login-card shadow-lg">

      {/* LEFT SIDE IMAGE */}
      <div className="login-image">
        <div className="overlay-text">
          <h4>TRAVEL IS THE ONLY THING</h4>
          <h4>YOU BUY THAT MAKES YOU</h4>
          <h3>RICHER</h3>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="login-form p-5">
        <h3 className="text-center mb-4">Busify Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email ID</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <hr />

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-success"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>

          <button
            className="btn btn-warning"
            onClick={() => navigate("/admin-login")}
          >
            Admin Login
          </button>
        </div>
      </div>

    </div>
  </div>
);

}
