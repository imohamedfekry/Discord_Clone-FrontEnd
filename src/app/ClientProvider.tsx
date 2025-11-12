// src/components/ClientProvider.tsx
"use client";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SocketProvider } from "@/context/SocketContext";

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SocketProvider>
        <AuthProvider>{children}</AuthProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}
