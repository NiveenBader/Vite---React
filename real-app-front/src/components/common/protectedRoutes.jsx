import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

const ProtectedRoute = ({ children, onlyBiz = false, onlyAdmin }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  if (onlyBiz && !user.isBusiness) {
    return <Navigate to="/sign-in" />;
  }

  if (onlyAdmin && !user.isAdmin) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
