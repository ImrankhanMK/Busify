
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Signup from "./auth/SignUp";
import User from "./pages/User";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Admin from "./pages/Admin";
import Revenue from "./pages/Revenue";
import AdminUserHandling from "./pages/AdminUserHandling";
import AdminBusesHandling from "./pages/AdminBusesHandling";
import Bookings from "./pages/Bookings";
import Reviews from "./pages/Reviews";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          }
         >
          <Route index element={<Revenue />} /> {/* Default page */}
          <Route path="admin-users-handling" element={<AdminUserHandling />} />
          <Route path="admin-buses-handling" element={<AdminBusesHandling />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

