import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface TelegramState {
  telegramId: string;
}

const initialState: TelegramState = {
  telegramId: "",
};

export const telegramSlice = createSlice({
  name: "telegram",
  initialState,
  reducers: {
    setTelegramId: (state, action: PayloadAction<string>) => {
      state.telegramId = action.payload;
    },
  },
});

export const { setTelegramId } = telegramSlice.actions;

export const selectTelegramId = (state: RootState) => state.telegram.telegramId;

export default telegramSlice.reducer;
