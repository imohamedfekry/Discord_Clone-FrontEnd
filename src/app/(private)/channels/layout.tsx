"use client";

import React, { ReactNode } from "react";
import ApplicationTopBar from "@/components/layout/ApplicationTopBar";
import ServersBar from "@/components/layout/ServersBar";
import SidebarContainer from "@/components/layout/SidebarContainer";
import MainContentArea from "@/components/layout/MainContentArea";
import UserPanel from "@/components/layout/UserPanel";
import AppGate from "@/system/AppGate";
import { FriendsTabProvider } from "@/context/FriendsTabContext";

interface ChannelsLayoutProps {
  children: ReactNode;
}

export default function ChannelsLayout({ children }: ChannelsLayoutProps) {
  return (
    <AppGate>
      <FriendsTabProvider>
        <div className="flex flex-col h-screen w-screen bg-(--background-base-lowest) text-(--text-primary) overflow-hidden">
          {/* Application TopBar (Global Navigation) */}
          <ApplicationTopBar />

          {/* Main Layout Container */}
          <div className="flex flex-1 overflow-hidden">
            {/* Column 1: Servers Bar */}
            <ServersBar />

            {/* Column 2: Sidebar (DmBar or ChannelsList) */}
            <SidebarContainer />

            {/* Column 3: Main Content Area */}
            <MainContentArea>{children}</MainContentArea>
          </div>

          {/* Bottom Panel: UserPanel */}
          <UserPanel />
        </div>
      </FriendsTabProvider>
    </AppGate>
  );
}
