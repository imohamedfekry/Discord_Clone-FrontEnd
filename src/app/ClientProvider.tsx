"use client";
import { ReactNode } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SocketProvider } from "@/context/SocketContext";

function ThemeWrapper({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userTheme = user?.theme || user?.preferences?.theme || null;
  return <ThemeProvider userTheme={userTheme}>{children}</ThemeProvider>;
}

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeWrapper>
        <SocketProvider>
          {children}
        </SocketProvider>
      </ThemeWrapper>
    </AuthProvider>
  );
}
