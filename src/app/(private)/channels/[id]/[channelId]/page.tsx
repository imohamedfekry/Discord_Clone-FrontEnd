"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function ServerChannelPage() {
  const params = useParams(); // هنا params.sync متاح
  const serverId = params?.id as string;
  const channelId = params?.channelId as string;

  return (
    <div className="flex h-full gap-4">
      {/* server rooms */}
      <div className="flex-1 flex flex-col">
        {/* server content */}
        </div>
    </div>
  );
}
