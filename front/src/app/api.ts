// # Настройка RTK Query (Base API)

import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dev.admin13.uz/v1",
  prepareHeaders: (headers, { getState }) => {
    const tgId = (getState() as RootState).telegram.telegramId;
    const token = (getState() as RootState).company.token;
    console.log(token, "token");

    headers.set("telegram-id", tgId);
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Comment", "Category", "Admin", "Products"],
  endpoints: () => ({}),
});
