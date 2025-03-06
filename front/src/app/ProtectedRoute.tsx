import { Navigate, Outlet } from "react-router";
import { useAppSelector, useAppDispatch } from "./hooks";
import { selectedCompanyToken } from "../features/company/companySlice";
import { selectCurrentUser, logout } from "../features/auth/authSlice";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectedCompanyToken);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    // Проверяем наличие данных пользователя
    if (isAuthenticated && !currentUser) {
      console.log("Данные администратора не найдены. Выполняется выход из системы.");
      dispatch(logout());
      // Перенаправление произойдет автоматически благодаря условию ниже
    }
  }, [isAuthenticated, currentUser, dispatch]);

  return isAuthenticated && currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
