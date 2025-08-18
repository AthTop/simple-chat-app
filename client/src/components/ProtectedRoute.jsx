import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};
