"use client";

import { useMemo } from "react";
import { useSocket } from "@/context/SocketContext";
import { useAuth } from "@/components/hooks/useAuth";
import { useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store";
import type { SocketState } from "@/store/socketSlice";

const selectSocketState = (state: RootState): SocketState => state.socket as SocketState;

export default function AppGate({ children }: { children: React.ReactNode }) {
  const { user, initialized } = useAuth();
  const { connected } = useSocket();
  const { friends, incomingRequests, outgoingRequests } = useAppSelector(selectSocketState);
  const sessionLoading = !initialized;

  const initialLoaded = useMemo(() => {
    if (!connected) return false;
    return (
      friends !== undefined &&
      incomingRequests !== undefined &&
      outgoingRequests !== undefined
    );
  }, [connected, friends, incomingRequests, outgoingRequests]);

  // ---- Discord-Like Loading Phases ----

  // 1) Auth session loading
  if (sessionLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-[#202225] text-white">
        <div className="text-2xl animate-pulse">Loading Session...</div>
      </div>
    );
  }

  // 2) User not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-[#202225] text-white">
        <div>Please login...</div>
      </div>
    );
  }

  // 3) Socket not connected yet (Discord style: Connecting to Gateway)
  if (!connected) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-[#202225] text-white">
        <div className="text-xl animate-pulse">Connecting to Gateway...</div>
      </div>
    );
  }

  // 4) Initial data not received yet (Discord: Fetching Messages / Loading friends)
  if (!initialLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-[#202225] text-white flex-col gap-4">
        <div className="text-xl">Syncing Data...</div>
        <div className="w-64 h-2 bg-gray-700 rounded">
          <div className="h-full bg-indigo-500 animate-[loading_1s_linear_infinite] rounded"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
