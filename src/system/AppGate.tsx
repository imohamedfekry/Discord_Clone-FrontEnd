"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { useSocketStore } from "@/components/store/socketStore";

export default function AppGate({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { connected } = useSocket();
  const { friends, incomingRequests, outgoingRequests } = useSocketStore();

  // هل استلمنا الداتا الأولية؟
  const [initialLoaded, setInitialLoaded] = useState(false);

  useEffect(() => {
    if (!connected) return;
    // نعتبر الداتا اتحملت لما يكون على الأقل friends اتعبت
    // وانت تقدر تغير شرطك
    const ready =
      friends !== undefined &&
      incomingRequests !== undefined &&
      outgoingRequests !== undefined;

    if (ready) setInitialLoaded(true);
  }, [connected, friends, incomingRequests, outgoingRequests]);

  // ---- Discord-Like Loading Phases ----

  // 1) Auth session loading
  if (authLoading) {
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
