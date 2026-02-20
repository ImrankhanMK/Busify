import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function ProtectedRoute({ children }) {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // wait for firebase
  }

 if (!user) {
    return <Navigate to="/login" />;
  }

  if (userData?.role !== "user") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
