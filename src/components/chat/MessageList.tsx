"use client";

import React from "react";

interface MessageListProps {
  channelId: string;
  type: "dm" | "channel";
}

export default function MessageList({ channelId, type }: MessageListProps) {
  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="text-center text-(--text-secondary) text-sm">
        This is the beginning of your {type === "dm" ? "direct message" : "channel"} history.
      </div>
    </div>
  );
}

