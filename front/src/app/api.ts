// # Настройка RTK Query (Base API)

import {
  fetchBaseQuery,
  createApi,
  FetchArgs,
  BaseQueryFn,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { logout } from "../features/auth/authSlice";
import { store } from "./store";

// Создаем кастомный baseQuery с обработкой ошибок
const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "https://dev.admin13.uz/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).company.token;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  });

  // Выполняем запрос
  const result = await baseQuery(args, api, extraOptions);

  // Проверяем наличие ошибок
  if (result.error) {
    // Если ошибка 401 (Unauthorized) или 403 (Forbidden) или сообщение об удалении администратора
    if (
      result.error.status === 401 ||
      result.error.status === 403 ||
      (result.error.data &&
        typeof result.error.data === "object" &&
        "message" in result.error.data &&
        (result.error.data.message === "Администратор не найден" ||
          result.error.data.message === "Admin not found" ||
          result.error.data.message === "Unauthorized" ||
          result.error.data.message === "Forbidden"))
    ) {
      console.log(
        "Сессия истекла или администратор был удален. Выполняется выход из системы.",
      );
      // Выполняем выход из системы
      store.dispatch(logout());
      // Перенаправляем на страницу входа
      window.location.href = "/login";
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Comment", "Category", "Admin", "Products", "Analytics"],
  endpoints: () => ({}),
});
