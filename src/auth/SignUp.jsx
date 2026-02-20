import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { auth, db } from "../services/Firebase.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name || !email || !password) {
      return setError("Please fill all required fields.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    try {
      setLoading(true);

      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: user.email,
        phone: phone.trim() || null,
        role: "user",
        status: "active",     // new field for admin control
        createdAt: new Date(),
      });


      await signOut(auth);

      // 3️⃣ Redirect directly to dashboard (user is already logged in)
      alert("✅ Registration successful! Please login.");
      navigate("/login");

    } catch (err) {
      console.error("Signup error:", err);

      // Friendly error messages
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password is too weak.");
          break;
        default:
          setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card signup-card">
        <div className="login-form p-5">
          <h3 className="text-center mb-4">Create Account</h3>

          {error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

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

            <div className="mb-3">
              <label>Phone (optional)</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
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

        <div className="login-image">
          <Link to="/" className="home-icon">
            <i className="bi bi-house-door-fill"></i>
          </Link>
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

