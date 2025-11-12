// src/context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "@/components/lib/authApi";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        console.log("🔁 Fetching user via authApi.getMe()");
        const data = await authApi.getMe();
        console.log("✅ Me user:", data);
        setUser(data);
      } catch (err) {
        console.warn("⚠️ getMe failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    // السيرفر حط التوكن في httpOnly cookie تلقائيًا
    setUser(res.user || null);
  };

  const logout = async () => {
    try {
    //   await authApi.logout();
    } catch (err) {
      console.warn("Logout failed:", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
