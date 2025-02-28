import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "./hooks";
import { selectIsAuthenticated } from "../features/auth/authSlice";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  console.log(isAuthenticated, "isAuthenticated");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
