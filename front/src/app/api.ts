// # Настройка RTK Query (Base API)

import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dev.admin13.uz/v1",
  prepareHeaders: (headers, { getState }) => {
    const tgId = (getState() as RootState).companyId.userTelegramId;
    headers.set("telegram-id", tgId);
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Comment"],
  endpoints: () => ({}),
});
