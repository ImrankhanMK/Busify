import { useState } from "react";
// import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("Please fill all fields");

    try {
      alert("Registration successful! You can now login.");
      navigate("/login");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error occurred. Check console.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card signup-card">
        <div className="login-form p-5">
          <h3 className="text-center mb-4">Create Account</h3>
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label>Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Phone (optional)</label>
              <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-success w-100">Create Account</button>
          </form>
          <hr />
          <button className="btn btn-light w-100 mt-2" onClick={() => navigate("/login")}>Back to Login</button>
        </div>
        <div className="login-image">
          <div className="overlay-text">
            <h4>START YOUR JOURNEY</h4>
            <h4>WITH</h4>
            <h3>BUSIFY</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
