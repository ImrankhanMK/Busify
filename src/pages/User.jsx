// import { useAuth } from "../auth/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// function User() {
//   const { user, role, logout, loading } = useAuth();
//   const navigate = useNavigate();


// useEffect(() => {
//   // Push a new state so back button won't go to home
//   window.history.pushState(null, null, window.location.href);

//   const handlePopState = () => {
//     window.history.pushState(null, null, window.location.href);
//   };

//   window.addEventListener("popstate", handlePopState);

//   return () => {
//     window.removeEventListener("popstate", handlePopState);
//   };
// }, []);


//   useEffect(() => {
//     // If not logged in, redirect to login
//     if (!loading && !user) {
//       navigate("/login");
//     }
//   }, [user, loading, navigate]);

//   const handleLogout = async () => {
//     await logout();
//     // navigate("/");
//     navigate("/", { replace: true });

//   };

//   if (loading) {
//     return <div style={{ textAlign: "center", marginTop: "100px" }}>Loading...</div>;
//   }

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>User Dashboard</h2>

//       <hr />

//       <div style={{ marginBottom: "20px" }}>
//         <p><strong>Email:</strong> {user?.email}</p>
//         <p><strong>Role:</strong> {role}</p>
//       </div>

//       <button
//         onClick={handleLogout}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "red",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

// export default User;
// import { useAuth } from "../auth/AuthContext";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useEffect } from "react";

// function User() {
//   const { user, role, logout, loading } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // 🔹 Redirect if not logged in
//   useEffect(() => {
//     if (!loading && !user) {
//       navigate("/login", { replace: true });
//     }
//   }, [user, loading, navigate]);

//   // 🔹 Special back behavior ONLY on dashboard root
//   useEffect(() => {
//     const handlePopState = () => {
//       if (location.pathname === "/user-dashboard") {
//         navigate("/", { replace: true });
//       }
//     };

//     window.addEventListener("popstate", handlePopState);

//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, [location.pathname, navigate]);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/", { replace: true });
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "100px" }}>
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>User Dashboard</h2>

//       <hr />

//       <div style={{ marginBottom: "20px" }}>
//         <p><strong>Email:</strong> {user?.email}</p>
//         <p><strong>Role:</strong> {role}</p>
//       </div>

//       <button
//         onClick={handleLogout}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "red",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

// export default User;
import React from 'react'

function User() {
  return (
    <div>User</div>
  )
}

export default User
