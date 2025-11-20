"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export interface RouteInfo {
  isFriends: boolean;
  isDM: boolean;
  isServer: boolean;
  dmId: string | null;
  serverId: string | null;
  channelId: string | null;
}

export function useRouteDetection(): RouteInfo {
  const pathname = usePathname() || "";

  return useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);

    // Routes we support:
    // - /channels/@me          -> Friends view
    // - /channels/@me/:id      -> Direct message view
    // - /channels/:sid/:cid   -> Server + channel view

    const isFriends = pathname === "/channels/@me";
    const isDM =
      parts.length === 3 && parts[0] === "channels" && parts[1] === "@me";
    const isServer =
      parts[0] === "channels" &&
      !isDM &&
      !isFriends &&
      parts.length >= 3 &&
      parts[1] !== "@me";

    const dmId = isDM ? parts[2] : null;
    const serverId = isServer ? parts[1] : null;
    const channelId = isServer ? parts[2] : null;

    return {
      isFriends,
      isDM,
      isServer,
      dmId,
      serverId,
      channelId,
    };
  }, [pathname]);
}

