import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (newTheme: Theme) => {
        set({ theme: newTheme });
        if (typeof window !== "undefined") {
          document.documentElement.setAttribute("data-theme", newTheme);
        }
      },
    }),
    {
      name: "discord-theme-storage",
    }
  )
);
