import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "./hooks";
import { selectedCompanyToken } from "../features/company/companySlice";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectedCompanyToken);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
