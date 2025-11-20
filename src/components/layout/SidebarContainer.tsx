"use client";

import React, { ReactNode } from "react";
import DmBar from "./Dmbar";
import ChannelsList from "./ChannelsList";
import { useRouteDetection } from "../hooks/useRouteDetection";

export default function SidebarContainer() {
  const { isDM, isFriends, isServer } = useRouteDetection();

  if (isDM || isFriends) {
    return <DmBar />;
  }

  if (isServer) {
    return <ChannelsList />;
  }

  return null;
}

