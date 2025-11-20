"use client";

import React from "react";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";

interface ServerChannelProps {
  serverId: string;
  channelId: string;
}

export default function ServerChannel({
  serverId,
  channelId,
}: ServerChannelProps) {
  // Mock channel data - replace with real data later
  const channel = {
    id: channelId,
    name: "general",
    type: "text",
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-(--background-secondary)">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <MessageList channelId={channelId} type="channel" />
      </div>

      {/* Input Area */}
        <MessageInput
          channelId={channelId}
          type="channel"
          placeholder={`Message #${channel.name}`}
        />
    </div>
  );
}
