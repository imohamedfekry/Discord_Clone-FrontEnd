"use client";

import React from "react";
import TopBarServer from "./TopBarServer";
import TopBarFriends from "./TopBarFriends";
import TopBarDM from "./TopBarDM";

interface ContentTopBarProps {
  isDM: boolean;
  isFriends: boolean;
  isServer: boolean;
  dmId?: string | null;
  serverId?: string | null;
  channelId?: string | null;
  showDmProfile?: boolean;
  onToggleDmProfile?: () => void;
}

export default function ContentTopBar({
  isDM,
  isFriends,
  isServer,
  dmId,
  serverId,
  channelId,
  showDmProfile,
  onToggleDmProfile,
}: ContentTopBarProps) {
  if (isFriends) {
    return <TopBarFriends />;
  }

  if (isDM && dmId) {
    return (
      <TopBarDM
        dmId={dmId}
        showDmProfile={showDmProfile}
        onToggleDmProfile={onToggleDmProfile}
      />
    );
  }

  if (isServer && serverId && channelId) {
    return <TopBarServer serverId={serverId} channelId={channelId} />;
  }

  return null;
}
