import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const IndexRedirect = () => {
  const { user } = useAuth();

  if (user) return <Navigate to="/chat" replace />;
  return <Navigate to="/login" replace />;
};

export default IndexRedirect;
