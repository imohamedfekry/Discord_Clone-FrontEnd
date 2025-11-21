"use client";
import React, { createContext, useContext, useEffect, ReactNode, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateTheme, setTheme, type ThemeMode } from "@/store/themeSlice";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  userTheme?: ThemeMode | null;
}

const THEME_STORAGE_KEY = "discord-theme-storage";

export function ThemeProvider({ children, userTheme }: ThemeProviderProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const hydrated = useAppSelector((state) => state.theme.hydrated);

  useEffect(() => {
    if (hydrated) return;
    const storedTheme =
      typeof window !== "undefined"
        ? (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null)
        : null;

    dispatch(hydrateTheme(userTheme || storedTheme || "dark"));
  }, [dispatch, hydrated, userTheme]);

  useEffect(() => {
    const finalTheme = (userTheme as ThemeMode | null) || theme;
    if (!finalTheme || typeof window === "undefined") return;

    document.documentElement.setAttribute("data-theme", finalTheme);
    localStorage.setItem(THEME_STORAGE_KEY, finalTheme);
  }, [theme, userTheme]);

  useEffect(() => {
    if (userTheme && userTheme !== theme) {
      dispatch(setTheme(userTheme));
    }
  }, [dispatch, userTheme, theme]);

  const handleSetTheme = useCallback(
    (mode: ThemeMode) => {
      dispatch(setTheme(mode));
    },
    [dispatch]
  );

  const contextValue = useMemo(
    () => ({
      theme: (userTheme as ThemeMode | null) || theme,
      setTheme: handleSetTheme,
    }),
    [theme, userTheme, handleSetTheme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}