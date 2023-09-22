import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
