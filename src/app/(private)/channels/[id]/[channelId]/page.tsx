"use client";
import React from "react";
import { useParams } from "next/navigation";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";

export default function ServerChannelPage() {
  const params = useParams();
  const serverId = params?.id as string;
  const channelId = params?.channelId as string;

  return (
    // <div className="flex-1 flex flex-col h-full bg-(--background-base-lowest)">
    //   {/* Messages Area */}
    //   <div className="flex-1 overflow-y-auto">
    //     <MessageList channelId={channelId} type="channel" />
    //   </div>
      
    //   {/* Input Area */}
    //     <MessageInput channelId={channelId} type="channel" placeholder={`Message #channel`} />
    // </div>
    <>
    
    <h1>ServerChannelPage</h1>
    </>
  );
}
