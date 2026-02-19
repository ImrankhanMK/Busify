
import React, { useEffect, useState } from "react";
import { auth, db } from "../services/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function User() {
  const [user] = useAuthState(auth); // get logged-in user
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Fetch user name from Firestore
  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setName(userDoc.data().name);
        } else {
          setName("User");
        }
      }
    };
    fetchUserName();
  }, [user]);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login"); // redirect to login
  };

  // Redirect if no user
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // return (
  //   <div style={{ padding: "2rem", textAlign: "center" }}>
  //     <h2>Welcome, {name}!</h2>
  //     <p>You are now logged in to Busify.</p>
  //     <button 
  //       onClick={handleLogout} 
  //       className="btn btn-danger mt-3"
  //     >
  //       Logout
  //     </button>
  //   </div>
  // );

return (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h2>Welcome, {name}!</h2>
    <p>You are now logged in to Busify.</p>

    <div style={{ marginTop: "20px" }}>
      <Link to="/" className="btn btn-primary me-3">
        Home
      </Link>

      <button 
        onClick={handleLogout} 
        className="btn btn-danger"
      >
        Logout
      </button>
    </div>
  </div>
);
}
