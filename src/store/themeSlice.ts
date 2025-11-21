import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

interface ThemeState {
  theme: ThemeMode;
  hydrated: boolean;
}

const initialState: ThemeState = {
  theme: "dark",
  hydrated: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
    },
    hydrateTheme(state, action: PayloadAction<ThemeMode | null | undefined>) {
      if (action.payload) {
        state.theme = action.payload;
      }
      state.hydrated = true;
    },
  },
});

export const { setTheme, hydrateTheme } = themeSlice.actions;
export default themeSlice.reducer;

