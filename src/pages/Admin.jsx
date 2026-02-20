import React from "react";
import { Link, Outlet ,useNavigate} from "react-router-dom";
import "../css/admin.css";
import { signOut } from "firebase/auth";
import { auth, db } from "../services/Firebase";

function Admin() {

   const navigate = useNavigate();
  const goHome = () => {
    navigate("/"); // redirect to Home page
  };

   const handleLogout = async () => {
  try {
    await signOut(auth); // firebase logout
    navigate("/login"); // ✅ this matches your App.js route
  } catch (error) {
    console.error("Logout failed:", error);
    alert("Logout failed. Try again.");
  }
};
  return (
    <div className="admin-container">

      <div className="admin-header">
        <div className="d-flex gap-3 align-items-center"><img src="/images/logo.png" alt="Admin Logo" className="admin-logo" height={"50"} /><div className="admin-banner">
          <h1 className="page-title">Admin Dashboard</h1>
      </div></div>
         
        <div className="admin-header-links">
          <Link to="" className="nav-link">Dashboard</Link>
          <Link to="admin-users-handling" className="nav-link">Users</Link>
          <Link to="admin-buses-handling" className="nav-link">Buses</Link>
          <Link to="bookings" className="nav-link">Bookings</Link>
          <Link to="reviews" className="nav-link">Reviews</Link>
        </div>
        <div>
          <button onClick={goHome} className="btn btn-outline-warning mx-3">Home</button>
          <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
        </div>

      </div>
      <section className="content-area">
          <Outlet />
        </section>
      
    </div>
  );
}

export default Admin;
