"use client";

import React from "react";
import { useParams } from "next/navigation";
import ServerChannel from "@/components/channels/ServerChannel";

export default function ServerChannelPage() {
  const params = useParams();
  const serverId = params?.id as string;
  const channelId = params?.channelId as string;

  if (!serverId || !channelId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-(--text-secondary)">Loading...</div>
      </div>
    );
  }

  return <ServerChannel serverId={serverId} channelId={channelId} />;
}
