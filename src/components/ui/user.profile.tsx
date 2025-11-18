"use client";
import React from "react";

export default function DmUserProfile({ dmId }: { dmId: string }) {

  // 🔥 بيانات ثابتة (STATIC) — تقدر تعدلها زي ما تحب
  const user = {
    id: dmId,
    username: "John Doe",
    discriminator: "0421",
    avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
    bio: "This is a static bio for the user. You can replace it any time.",
    status: "online",
    mutualServers: 3
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4">

      {/* Profile Header */}
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt={`${user.username} avatar`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">
            {user.username}#{user.discriminator}
          </div>
          <div className="text-sm text-[var(--text-secondary)] capitalize">
            {user.status}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="text-sm text-[var(--text-secondary)]">
        {user.bio}
      </div>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-2">
        <button className="w-full py-2 rounded-md border border-[var(--border-primary)]">
          Message
        </button>
        <button className="w-full py-2 rounded-md bg-[var(--accent-primary)] text-white">
          Call
        </button>
      </div>

      {/* Mutual Servers */}
      <div className="text-xs text-[var(--text-secondary)]">
        Mutual servers: {user.mutualServers}
      </div>
    </div>
  );
}
