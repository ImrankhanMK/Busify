import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) return alert("Fill all fields");

    // 1️⃣ Check if email already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single(); // Returns single row if exists

    if (fetchError && fetchError.code !== "PGRST116") {
      // Unexpected error (ignore "row not found" code PGRST116)
      return alert("Error checking email: " + fetchError.message);
    }

    if (existingUser) {
      return alert("User with this email already exists. Try a new email.");
    }

    // 2️⃣ Insert new user
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password }]); // id & created_at auto-filled

    if (error) return alert("Error: " + error.message);

    alert("Signup successful! Please login.");
    navigate("/login");
  };

  // return (
  //   <div className="container" style={{ maxWidth: "400px", marginTop: "80px" }}>
  //     <div className="card shadow">
  //       <div className="card-body">
  //         <h3 className="text-center mb-4">Sign Up</h3>
  //         <form onSubmit={handleSignup}>
  //           <div className="mb-3">
  //             <label>Name</label>
  //             <input
  //               type="text"
  //               className="form-control"
  //               value={name}
  //               onChange={(e) => setName(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="mb-3">
  //             <label>Email</label>
  //             <input
  //               type="email"
  //               className="form-control"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="mb-3">
  //             <label>Password</label>
  //             <input
  //               type="password"
  //               className="form-control"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <button type="submit" className="btn btn-success w-100">
  //             Create Account
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
  <div className="login-wrapper">
    <div className="login-card signup-card">

      {/* LEFT SIDE FORM */}
      <div className="login-form p-5">
        <h3 className="text-center mb-4">Create Account</h3>

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Create Account
          </button>
        </form>

        <hr />

        <button
          className="btn btn-light w-100 mt-2"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>

      {/* RIGHT SIDE IMAGE */}
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
