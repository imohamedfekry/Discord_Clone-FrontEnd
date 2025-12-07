"use client";
import { ReactNode, useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/context/ThemeContext";
import { SocketProvider } from "@/socket";
import { store } from "@/store";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentUser } from "@/store/authSlice";
import { isPublicPage } from "@/config/env";
import { usePathname } from "next/navigation";
import ErrorBoundary from "@/components/ErrorBoundary";
import { queryClient } from "@/lib/queryClient";
import type { ThemeMode } from "@/store/themeSlice";
import type { AuthUser } from "@/store/authSlice";
import type { RootState } from "@/store";

function resolveUserTheme(user: AuthUser | null): ThemeMode | null {
  if (!user) return null;
  if (user.theme === "light" || user.theme === "dark") {
    return user.theme;
  }

  const preferences = user.preferences;
  if (preferences && typeof preferences === "object" && "theme" in preferences) {
    const themeValue = (preferences as { theme?: unknown }).theme;
    if (themeValue === "light" || themeValue === "dark") {
      return themeValue;
    }
  }

  return null;
}

function ThemeWrapper({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userTheme = useMemo(() => resolveUserTheme(user), [user]);
  return <ThemeProvider userTheme={userTheme}>{children}</ThemeProvider>;
}

function Bootstrapper({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const initialized = useAppSelector((state: RootState) => state.auth.initialized);

  useEffect(() => {
    if (!pathname || isPublicPage(pathname)) return;
    if (initialized) return;
    dispatch(fetchCurrentUser());
  }, [dispatch, pathname, initialized]);

  return <>{children}</>;
}

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Bootstrapper>
            <ThemeWrapper>
              <SocketProvider>{children}</SocketProvider>
            </ThemeWrapper>
          </Bootstrapper>
        </Provider>
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

