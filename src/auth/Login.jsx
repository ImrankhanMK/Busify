import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../services/Firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setMessage("❌ Please enter both email and password");
    }

    setLoading(true);
    setMessage("");

    try {
      // ✅ Set persistence before login
      await setPersistence(auth, browserLocalPersistence);

      // ✅ Sign in user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      setLoading(false);
      setMessage(`✅ Logged in as ${userCredential.user.email}`);

      // Redirect to user page
      navigate("/user-dashboard");
    } catch (error) {
      setLoading(false);

      // Friendly error messages
      switch (error.code) {
        case "auth/user-not-found":
          setMessage("❌ No account found with this email.");
          break;
        case "auth/wrong-password":
          setMessage("❌ Incorrect password.");
          break;
        case "auth/invalid-email":
          setMessage("❌ Invalid email format.");
          break;
        case "auth/too-many-requests":
          setMessage("❌ Too many failed attempts. Try again later.");
          break;
        default:
          setMessage(`❌ Login failed: ${error.message}`);
      }
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
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {message && <p className="mt-3">{message}</p>}

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
