"use client";

import React from "react";
import clsx from "clsx";

interface DmUserProfileProps {
  dmId: string;
}

export default function DmUserProfile({ dmId }: DmUserProfileProps) {
  // Mock user data - replace with real data later
  const user = {
    id: dmId,
    username: "John Doe",
    discriminator: "0421",
    avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
    bio: "This is a static bio for the user. You can replace it any time.",
    status: "online",
    mutualServers: 3,
  };

  return (
    <div className="w-full h-full bg-(--background-base-lowest) flex flex-col">
      {/* Profile Header */}
      <div className="p-4 border-b border-(--border-normal)">
        <div className="flex items-center gap-3">
          {/* Avatar with Status */}
          <div className="relative shrink-0">
            <img
              src={user.avatar}
              alt={`${user.username} avatar`}
              className="w-16 h-16 rounded-full object-cover"
            />
            {/* Status Indicator */}
            <span
              className={clsx(
                "absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-(--background-base-lowest)",
                user.status === "online" && "bg-(--status-online)",
                user.status === "idle" && "bg-(--status-idle)",
                user.status === "dnd" && "bg-(--status-dnd)",
                user.status === "offline" && "bg-(--status-offline)"
              )}
            />
          </div>

          {/* Username */}
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-[16px] text-(--text-primary) truncate">
              {user.username}
            </div>
            <div className="text-sm text-(--text-secondary) capitalize">
              {user.status}
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="p-4 border-b border-(--border-normal)">
        <div className="text-[12px] uppercase text-(--text-tertiary) font-semibold mb-2 tracking-wide">
          About
        </div>
        <div className="text-sm text-(--text-secondary) leading-relaxed">
          {user.bio}
        </div>
      </div>

      {/* Mutual Servers */}
      {user.mutualServers > 0 && (
        <div className="p-4 border-b border-(--border-normal)">
          <div className="text-[12px] uppercase text-(--text-tertiary) font-semibold mb-2 tracking-wide">
            Mutual Servers
          </div>
          <div className="text-sm text-(--text-primary)">
            {user.mutualServers} server{user.mutualServers !== 1 ? "s" : ""}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-auto p-4 space-y-2">
        <button className="w-full h-9 px-4 rounded text-sm font-medium border border-(--border-normal) bg-(--background-secondary) hover:bg-(--background-secondary-alt) text-(--text-primary) transition-colors">
          Message
        </button>
        <button className="w-full h-9 px-4 rounded text-sm font-medium bg-(--accent-primary) hover:bg-(--accent-primary-hover) text-white transition-colors">
          Call
        </button>
      </div>
    </div>
  );
}
