// # Конфигурация Redux Toolkit Store

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import telegramReducer from "../features/telegram/telegramSlice";
import authReducer from "../features/auth/authSlice";
import companyReducer from "../features/company/companySlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    telegram: telegramReducer,
    auth: authReducer,
    company: companyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
