"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface SocketContextType {
  connected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(true);
  }, []);

  return (
    <SocketContext.Provider value={{ connected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
}
