"use client";

import { useMemo } from "react";
import { useSocket } from "@/socket";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/store/hooks";
import { selectFriends, selectIncomingRequests, selectOutgoingRequests } from "@/store/selectors";

export default function AppGate({ children }: { children: React.ReactNode }) {
  const { user, initialized } = useAuth();
  const { isConnected } = useSocket();

  // Select data from new slices
  const friends = useAppSelector(selectFriends);
  const incomingRequests = useAppSelector(selectIncomingRequests);
  const outgoingRequests = useAppSelector(selectOutgoingRequests);

  const sessionLoading = !initialized;

  const initialLoaded = useMemo(() => {
    if (!isConnected) return false;
    // In the new architecture, we assume data is loaded if we are connected and have initial state.
    // You might want to add specific 'loading' flags in your slices if you need to track initial fetch status explicitly.
    // For now, we'll assume if we are connected, we are good to go or data will stream in.
    // To be more robust, you could add 'isLoaded' to your slices.
    return true;
  }, [isConnected]);

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
  console.log("AppGate Debug:", {
    user,
    initialized,
    sessionLoading,
    authStatus: user ? 'authenticated' : 'not authenticated'
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-[#202225] text-white">
        <div>Please login...</div>
      </div>
    );
  }

  // 3) Socket not connected yet (Discord style: Connecting to Gateway)
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-[#202225] text-white">
        <div className="text-xl animate-pulse">Connecting to Gateway...</div>
      </div>
    );
  }

  // 4) Initial data not received yet (Discord: Fetching Messages / Loading friends)
  // With the new architecture, we might want to skip this or implement a proper 'initial fetch' status.
  // For now, since initialLoaded is just true when connected, this block is effectively skipped, 
  // which is fine as data will appear as it arrives.
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
