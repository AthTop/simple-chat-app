import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export const AuthRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/chat" />;
};
