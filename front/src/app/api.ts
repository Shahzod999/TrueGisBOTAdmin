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

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dev.admin13.uz/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).company.token;
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;

    // Если 401 или 403 - разлогиниваем пользователя
    if (status === 401 || status === 403) {
      console.log(
        "Сессия истекла или у пользователя нет доступа. Выполняется выход из системы.",
      );
      store.dispatch(logout());
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
