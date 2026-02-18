
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Signup from "./auth/SignUp";
import AdminLogin from "./auth/AdminLogin";
import User from "./pages/User";
// import ProtectedRoute from "./components/ProtectedRoute";
import { onAuthStateChanged } from "firebase/auth";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-dashboard" element={<User />} />
        {/* <Route 
          path="/user-dashboard" 
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          } 
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
