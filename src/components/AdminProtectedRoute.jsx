import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminProtectedRoute({ children }) {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (userData?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
