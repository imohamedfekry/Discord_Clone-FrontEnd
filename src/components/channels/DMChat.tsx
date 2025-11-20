"use client";

import React from "react";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";

interface DMChatProps {
  dmId: string;
}

export default function DMChat({ dmId }: DMChatProps) {
  return (
    <div className="flex-1 flex flex-col h-full bg-(--background-base-lowest)">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <MessageList channelId={dmId} type="dm" />
      </div>

      {/* Input Area */}
        <MessageInput
          channelId={dmId}
          type="dm"
          placeholder={`Message @user`}
        />
    </div>
  );
}
