import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/Firebase";



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    return setMessage("❌ Please enter both email and password");
  }

  setLoading(true);
  setMessage("");
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Fetch user document
    const docSnap = await getDoc(doc(db, "users", userCredential.user.uid));

    if (!docSnap.exists()) {
      setMessage("❌ User record not found.");
      setLoading(false);
      return;
    }

    const data = docSnap.data();

    // Check status
    if (data.status === "blocked") {
      setMessage("❌ Your account has been blocked. Contact admin.");
      await auth.signOut(); // optional: prevent persistent login
      setLoading(false);
      return;
    }

    // Redirect based on role
    if (data.role === "admin") {
      navigate("/admin-dashboard", { replace: true });
    } else {
      navigate("/user-dashboard", { replace: true });
    }

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
            <Link to="/" className="home-icon">
    <i className="bi bi-house-door-fill"></i>
  </Link>
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
          </div>
        </div>
      </div>
    </div>
  );
}
