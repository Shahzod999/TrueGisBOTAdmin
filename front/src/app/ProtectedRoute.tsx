import { Navigate, Outlet } from "react-router";
import { useAppSelector, useAppDispatch } from "./hooks";
import { selectedCompanyToken } from "../features/company/companySlice";
import { selectCurrentUser, logout } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import AccessPassword from "../pages/Login/AccessPassword";
import { useCloudStorage } from "../hooks/useCloudStorage";
import Loading from "../components/Loading/Loading";

const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectedCompanyToken);
  const currentUser = useAppSelector(selectCurrentUser);

  const { value: accessPassword, isLoading } = useCloudStorage(
    "accessPassword",
    null,
  );
  const [isAccessPassword, setIsAccessPassword] = useState<string | null>(
    sessionStorage.getItem("isAccessGranted") ? null : "pending",
  );

  // Ждем загрузку accessPassword перед установкой состояния
  useEffect(() => {
    if (!isLoading) {
      if (!accessPassword || accessPassword === "null") {
        setIsAccessPassword(null);
      } else if (!sessionStorage.getItem("isAccessGranted")) {
        setIsAccessPassword("pending"); // Оставляем запрос пароля только если он нужен
      }
    }
  }, [accessPassword, isLoading]);

  useEffect(() => {
    // Проверяем наличие данных пользователя
    if (isAuthenticated && !currentUser) {
      console.log(
        "Данные администратора не найдены. Выполняется выход из системы.",
      );
      dispatch(logout());
    }
  }, [isAuthenticated, currentUser, dispatch]);

  const handleComplete = async (code: string): Promise<boolean> => {
    if (!accessPassword) return false; // Если пароль не загружен, запрещаем доступ

    if (code == accessPassword || code === "biometric_success") {
      setIsAccessPassword(null);
      sessionStorage.setItem("isAccessGranted", "true");
      return true;
    } else {
      return false;
    }
  };

  if (isLoading) return <Loading />;

  return isAuthenticated && currentUser ? (
    isAccessPassword === "pending" ? (
      <AccessPassword onComplete={handleComplete} />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
