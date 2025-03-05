// # Авторизация: логин, логаут, проверка токена

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Company {
  _id: string;
  name: string;
  address: string;
  logo: string;
}

interface User {
  _id: string;
  full_name: string;
  username: string;
  signature: number;
  created_by: string;
  created_at: number;
  deleted: boolean;
  companies: Company[];
}

interface AuthState {
  user: User | null;
}

// Проверяем localStorage при инициализации
const storedAuth = localStorage.getItem("auth");
const initialState: AuthState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      user: null,
    };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        data: User;
      }>,
    ) => {
      state.user = action.payload.data;
      // Сохраняем в localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload.data,
        }),
      );
    },
    logout: (state) => {
      state.user = null;
      // Очищаем localStorage
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
