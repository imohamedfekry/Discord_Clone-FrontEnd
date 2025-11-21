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
import { useAuth } from "@/components/hooks/useAuth";
import { useAppDispatch } from "@/store/hooks";
import { addIncomingRequest, removeRequest, setFriends, clearSocketState } from "@/store/socketSlice";

type EventHandler = (...args: unknown[]) => void;

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
  emit: (event: string, payload?: unknown, ack?: (res: unknown) => void) => void;
  on: (event: string, handler: EventHandler) => void;
  off: (event: string, handler?: EventHandler) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  const dispatch = useAppDispatch();
  const { user, initialized } = useAuth();

  const connect = useCallback(() => {
    if (socketRef.current) return;

    const socket = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000", {
      transports: ["websocket", "polling"],
      withCredentials: true, // مهم جداً للكوكيز
      autoConnect: true,
      reconnection: true,
    });

    socketRef.current = socket;
    setSocketInstance(socket);

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("connect_error", (err) => console.error("WS Error:", err.message));

    // --------------------------
    // 🔥 FRIENDS EVENTS ONLY 🔥
    // --------------------------

    socket.on("friend:request:received", (payload) => {
      dispatch(addIncomingRequest(payload.data || payload));
    });

    socket.on("friend:request:accepted", (payload) => {
      const data = payload.data || payload;
      dispatch(removeRequest(data.id));
    });

    socket.on("friend:request:rejected", (payload) => {
      const data = payload.data || payload;
      dispatch(removeRequest(data.id));
    });

    socket.on("friend:request:cancelled", (payload) => {
      const data = payload.data || payload;
      dispatch(removeRequest(data.id));
    });

    socket.on("friends:list", (list) => {
      dispatch(setFriends(list));
    });
  }, [dispatch]);

  const disconnect = useCallback(() => {
    if (!socketRef.current) return;
    socketRef.current.removeAllListeners();
    socketRef.current.disconnect();
    socketRef.current = null;
    setSocketInstance(null);
    setConnected(false);
    dispatch(clearSocketState());
  }, [dispatch]);

  useEffect(() => {
    if (!initialized) return;
    const schedule = (cb: () => void) => {
      if (typeof queueMicrotask === "function") {
        queueMicrotask(cb);
      } else {
        Promise.resolve().then(cb);
      }
    };

    if (user) {
      schedule(() => connect());
    } else {
      schedule(() => disconnect());
    }
  }, [user, initialized, connect, disconnect]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  const emit = (event: string, payload?: unknown, ack?: (res: unknown) => void) => {
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
    <SocketContext.Provider value={{ socket: socketInstance, connected, connect, disconnect, emit, on, off }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket must be used within SocketProvider");
  return ctx;
}
