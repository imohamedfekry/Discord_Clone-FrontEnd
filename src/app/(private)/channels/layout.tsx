"use client";
import ServersBar from "@/components/layout/ServersBar";
import TopBar from "@/components/layout/TopBar";
import UserPanel from "@/components/layout/UserPanel";
import DmBar from "@/components/layout/Dmbar";
import ChannelsList from "@/components/layout/ChannelsList";
import ContentTopBar from "@/components/ui/ContentTopBar/ContentTopBar";
import DmUserProfile from "@/components/ui/user.profile";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface ChannelsLayoutProps {
  children: ReactNode;
}

export default function ChannelsLayout({ children }: ChannelsLayoutProps) {
  const pathname = usePathname() || "";

  const parts = pathname.split("/").filter(Boolean);

  const isFriends = pathname === "/channels/@me";
  const isDM = parts.length === 3 && parts[0] === "channels" && parts[1] === "@me";
  const isServer =
    parts[0] === "channels" && !isDM && !isFriends && parts.length >= 3;

  const dmId = isDM ? parts[2] : null;

  return (
    <div className="flex flex-col h-screen w-screen bg-(--background-base-lowest) text-(--text-primary)">
      
      {/* Application TopBar */}
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <ServersBar />

        {(isDM || isFriends) && <DmBar />}
        {isServer && <ChannelsList />}

        {/* Main */}
        <main className="flex-1 flex overflow-hidden flex-col">
          
          {/* >>> Content Top Bar (the important one) <<< */}
          <ContentTopBar
            isDM={isDM}
            isFriends={isFriends}
            isServer={isServer}
            dmId={dmId}
          />

          <div className="flex-1 overflow-hidden">
            {children}
          </div>

          {/* DM Profile (Right Panel) */}
          {isDM && dmId && (
            <aside className="w-[300px] border-l border-(--border-primary)">
              <DmUserProfile dmId={dmId} />
            </aside>
          )}
        </main>
      </div>

      <UserPanel />
    </div>
  );
}
