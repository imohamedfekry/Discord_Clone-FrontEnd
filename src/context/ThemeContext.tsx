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

  // 1. Hydrate theme on mount
  useEffect(() => {
    if (hydrated) return;
    const storedTheme =
      typeof window !== "undefined"
        ? (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null)
        : null;

    // Prioritize userTheme (server/prop) -> storedTheme (local) -> default "dark"
    dispatch(hydrateTheme(userTheme || storedTheme || "dark"));
  }, [dispatch, hydrated, userTheme]);

  // 2. Sync Redux theme to DOM and LocalStorage
  useEffect(() => {
    if (!theme || typeof window === "undefined") return;

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // 3. Sync userTheme prop changes to Redux (e.g. if user profile updates)
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
      theme,
      setTheme: handleSetTheme,
    }),
    [theme, handleSetTheme]
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