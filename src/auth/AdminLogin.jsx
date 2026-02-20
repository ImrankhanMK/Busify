import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css"; 
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/Firebase";

export default function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleAdminLogin = async (e) => {
  e.preventDefault();

  if (!adminId || !password) {
    return alert("Please fill all fields");
  }

  try {
    // 1️⃣ Sign in using Firebase Auth
    const userCredential = await signInWithEmailAndPassword(
      auth,
      adminId,     // use email here
      password
    );

    const loggedUser = userCredential.user;

    // 2️⃣ Fetch Firestore user document
    const docRef = doc(db, "users", loggedUser.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      alert("No user record found.");
      return;
    }

    const userData = docSnap.data();

    // 3️⃣ Check role
    if (userData.role !== "admin") {
      alert("Access denied. Not an admin.");

      // 4️⃣ Force logout if not admin
      await auth.signOut();
      return;
    }

    alert("Welcome Admin!");
    navigate("/admin-dashboard");

  } catch (error) {
    alert("Invalid Admin Credentials");
    console.error(error);
  }
};

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* LEFT IMAGE SECTION */}
        <div className="login-image">
          <Link to="/" className="home-icon">
    <i className="bi bi-house-door-fill"></i>
  </Link>
          <div className="overlay-text">
            <h4>ADMIN CONTROL PANEL</h4>
            <h4>MANAGE YOUR</h4>
            <h3>BUSIFY SYSTEM</h3>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="login-form p-5">
          <h3 className="text-center mb-4">Admin Login</h3>

          <form onSubmit={handleAdminLogin}>
            <div className="mb-3">
              <label>Admin ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
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

            <button type="submit" className="btn btn-warning w-100">
              Login as Admin
            </button>
          </form>

          <hr />

          <button
            className="btn btn-light w-100"
            onClick={() => navigate("/login")}
          >
            Back to User Login
          </button>

        </div>
      </div>
    </div>
  );
}
