"use client";
import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { useThemeStore } from "@/components/store/themeStore";

interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  userTheme?: "light" | "dark" | null;
}

export function ThemeProvider({ children, userTheme }: ThemeProviderProps) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const finalTheme = userTheme || theme;
    document.documentElement.setAttribute("data-theme", finalTheme);
    
    if (userTheme && userTheme !== theme) {
      setTheme(userTheme);
    }
  }, [userTheme, theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme: userTheme || theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

