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
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Busify Admin</h2>
        <nav className="sidebar-nav">
          <Link to="" className="nav-link">Dashboard</Link>
          <Link to="admin-users-handling" className="nav-link">Users</Link>
          <Link to="admin-buses-handling" className="nav-link">Buses</Link>
          <Link to="bookings" className="nav-link">Bookings</Link>
          {/* <Link to="routes" className="nav-link">Routes</Link> */}
          <Link to="reviews" className="nav-link">Reviews</Link>
          <button onClick={goHome} className="home-btn">Home</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="main-content">
        <header className="topbar">
          <h1 className="page-title">Admin Dashboard</h1>
          <div className="profile">Admin</div>
        </header>

        {/* Nested page content will render here */}
        <section className="content-area">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default Admin;
