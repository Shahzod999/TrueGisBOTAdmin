// # React Router (все маршруты приложения)
import { Routes, Route, Navigate } from "react-router";
import { lazy, Suspense, useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import AdminList from "../pages/AdminList/AdminList";
import Analytics from "../pages/Analytics/Analytics";
import Settings from "../pages/Settings/Settings";
import { Telegram } from "@twa-dev/types";
import { useAppDispatch } from "./hooks";
import { setTelegramId } from "../features/telegram/telegramSlice";
import useTelegramBackButton from "../features/users/useTelegramBackButton";
import CategoryDetails from "../pages/Products/CategoryDetails";
import { useKeyboardAdjust } from "../utils/useKeyboardAdjust";

const Login = lazy(() => import("../pages/Login/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Users = lazy(() => import("../pages/Users/Users"));
const Products = lazy(() => import("../pages/Products/Products"));
const ProductDetails = lazy(() => import("../pages/Products/ProductDetails"));

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

const Router = () => {
  useKeyboardAdjust();
  const dispatch = useAppDispatch();
  useTelegramBackButton();
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.disableVerticalSwipes();

      if (parseFloat(tg.version || "0.0") >= 8.0) {
        tg.requestFullscreen();
      } else {
        console.warn(
          "requestFullscreen не поддерживается в этой версии Telegram",
        );
      }
    }
    const userId =
      tg.initDataUnsafe?.user?.id || import.meta.env.VITE_TELEGRAMID;
    if (userId) {
      dispatch(setTelegramId(userId.toString()));
    }
  }, [dispatch, tg]);

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        {/* Публичные страницы */}
        <Route path="/login" element={<Login />} />

        {/* Защищенные маршруты */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/adminList" element={<AdminList />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/category/:categoryId" element={<CategoryDetails />} />
        </Route>

        {/* Перенаправление на главную, если маршрут не найден */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
