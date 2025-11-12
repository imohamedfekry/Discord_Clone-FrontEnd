"use client";
import React from "react";
import DMChat from "@/components/channels/dm/DMChat";
import DMSidebar from "@/components/channels/dm/DMSidebar";

interface Props {
  params: {
    id: string;
  };
}

export default function DMChatPage({ params }: Props) {
  return (
    <div className="flex h-full gap-4">
      <DMSidebar />
      <div className="flex-1 flex flex-col">
        <DMChat dmId={params.id} userGlobalName={`User ${params.id}`} />
      </div>
    </div>
  );
}
