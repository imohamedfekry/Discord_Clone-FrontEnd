"use client";

import React from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";

export default function ChannelsList() {
  const params = useParams();
  const serverId = params?.id as string;

  // Mock channels data
  const channels = [
    { id: "1", name: "general", type: "text" },
    { id: "2", name: "random", type: "text" },
    { id: "3", name: "voice-chat", type: "voice" },
  ];

  return (
    <aside className="w-60 bg-(--background-base-low) flex flex-col h-full border-r border-(--border-normal)">
      {/* Server Header */}
      <div className="h-12 px-4 flex items-center border-b border-(--border-normal) shadow-sm">
        <h2 className="text-base font-semibold text-(--text-primary) truncate">
          Server Name
        </h2>
      </div>

      {/* Channels List */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        <div className="space-y-1">
          {channels.map((channel) => (
            <button
              key={channel.id}
              className={clsx(
                "w-full px-2 py-1.5 rounded text-sm text-left transition-colors",
                "hover:bg-(--background-secondary) text-(--text-secondary)",
                "hover:text-(--text-primary) flex items-center gap-2"
              )}
            >
              {channel.type === "text" ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 3C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H5M7 7H17V9H7V7M7 11H17V13H7V11M7 15H13V17H7V15Z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 16C9.33 16 5 17.33 5 20V22H19V20C19 17.33 14.67 16 12 16Z" />
                </svg>
              )}
              <span className="truncate">#{channel.name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

