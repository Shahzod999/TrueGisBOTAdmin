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
  token: string | null;
  isAuthenticated: boolean;
}

// Проверяем localStorage при инициализации
const storedAuth = localStorage.getItem("auth");
const initialState: AuthState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      user: null,
      token: null,
      isAuthenticated: false,
    };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        data: User;
        token: string;
      }>,
    ) => {
      state.user = action.payload.data;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // Сохраняем в localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload.data,
          token: action.payload.token,
          isAuthenticated: true,
        }),
      );
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Очищаем localStorage
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
