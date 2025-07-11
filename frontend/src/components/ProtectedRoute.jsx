import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // or use Context

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
