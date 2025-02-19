// # React Router (все маршруты приложения)

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";

// Ленивая загрузка страниц (для оптимизации)
const Login = lazy(() => import("../pages/Login/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Users = lazy(() => import("../pages/Users/Users"));
const Products = lazy(() => import("../pages/Products/Products"));
const ProductDetails = lazy(() => import("../pages/Products/ProductDetails"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          {/* Публичные страницы */}
          <Route path="/login" element={<Login />} />

          {/* Защищенные маршруты */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Route>

          {/* Перенаправление на главную, если маршрут не найден */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
