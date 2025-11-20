"use client";

import React, { ReactNode, useState } from "react";
import ContentTopBar from "./ContentTopBar/ContentTopBar";
import DmUserProfile from "./RightPanels/DmUserProfile";
import MemberList from "./RightPanels/MemberList";
import { useRouteDetection } from "../hooks/useRouteDetection";

interface MainContentAreaProps {
  children: ReactNode;
}

export default function MainContentArea({ children }: MainContentAreaProps) {
  const routeInfo = useRouteDetection();
  const [showDmProfile, setShowDmProfile] = useState(true);

  return (
    <main className="flex-1 flex overflow-hidden flex-col relative bg-(--background-secondary)">
      {/* Content TopBar (Dynamic - changes based on route) */}
      <ContentTopBar
        isDM={routeInfo.isDM}
        isFriends={routeInfo.isFriends}
        isServer={routeInfo.isServer}
        dmId={routeInfo.dmId || undefined}
        serverId={routeInfo.serverId || undefined}
        channelId={routeInfo.channelId || undefined}
        showDmProfile={showDmProfile}
        onToggleDmProfile={() => setShowDmProfile(!showDmProfile)}
      />

      {/* Content Body with Right Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">{children}</div>

        {/* Right Panel - DM Profile */}
        {routeInfo.isDM && routeInfo.dmId && showDmProfile && (
          <aside className="w-[300px] border-l border-(--border-normal) shrink-0 bg-(--background-base-lowest)">
            <DmUserProfile dmId={routeInfo.dmId} />
          </aside>
        )}

        {/* Right Panel - Member List */}
        {routeInfo.isServer && routeInfo.serverId && routeInfo.channelId && (
          <aside className="w-[240px] border-l border-(--border-normal) shrink-0 bg-(--background-base-lowest)">
            <MemberList
              serverId={routeInfo.serverId}
              channelId={routeInfo.channelId}
            />
          </aside>
        )}
      </div>
    </main>
  );
}
