"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/context/AuthContext";
import { useSocketStore } from "@/components/store/socketStore";

type EventHandler = (...args: any[]) => void;

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
  emit: (event: string, payload?: any, ack?: (res: any) => void) => void;
  on: (event: string, handler: EventHandler) => void;
  off: (event: string, handler?: EventHandler) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  const {
    setFriends,
    addIncomingRequest,
    addOutgoingRequest,
    removeRequest,
  } = useSocketStore();

  const { user, loading } = useAuth();

  const connect = useCallback(() => {
    if (socketRef.current) return;

    const socket = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000", {
      transports: ["websocket", "polling"],
      withCredentials: true, // مهم جداً للكوكيز
      autoConnect: true,
      reconnection: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("connect_error", (err) => console.error("WS Error:", err.message));

    // --------------------------
    // 🔥 FRIENDS EVENTS ONLY 🔥
    // --------------------------

    socket.on("friend:request:received", (payload) => {
      addIncomingRequest(payload.data || payload);
    });

    socket.on("friend:request:accepted", (payload) => {
      const data = payload.data || payload;
      removeRequest(data.id);
      // ممكن تبعت حدث update friends list
    });

    socket.on("friend:request:rejected", (payload) => {
      const data = payload.data || payload;
      removeRequest(data.id);
    });

    socket.on("friend:request:cancelled", (payload) => {
      const data = payload.data || payload;
      removeRequest(data.id);
    });

    socket.on("friends:list", (list) => {
      setFriends(list);
    });

  }, [setFriends, addIncomingRequest, addOutgoingRequest, removeRequest]);

  useEffect(() => {
    if (loading) return;

    if (user) {
      connect();
    } else {
      disconnect();
    }

    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const disconnect = useCallback(() => {
    if (!socketRef.current) return;
    socketRef.current.removeAllListeners();
    socketRef.current.disconnect();
    socketRef.current = null;
    setConnected(false);
  }, []);

  const emit = (event: string, payload?: any, ack?: (res: any) => void) => {
    socketRef.current?.emit(event, payload, ack);
  };

  const on = (event: string, handler: EventHandler) => {
    socketRef.current?.on(event, handler);
  };

  const off = (event: string, handler?: EventHandler) => {
    if (handler) socketRef.current?.off(event, handler);
    else socketRef.current?.removeAllListeners(event);
  };

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, connected, connect, disconnect, emit, on, off }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket must be used within SocketProvider");
  return ctx;
}
