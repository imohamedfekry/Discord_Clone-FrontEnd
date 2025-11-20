"use client";

import React, { useState } from "react";
import clsx from "clsx";

interface MemberListProps {
  serverId: string;
  channelId: string;
}

interface Member {
  id: string;
  username: string;
  avatar: string;
  status: "online" | "idle" | "dnd" | "offline";
  role?: string;
}

export default function MemberList({ serverId, channelId }: MemberListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock members data - replace with real data later
  const members: Member[] = [
    {
      id: "1",
      username: "Admin User",
      avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
      status: "online",
      role: "Admin",
    },
    {
      id: "2",
      username: "Moderator",
      avatar: "https://cdn.discordapp.com/embed/avatars/2.png",
      status: "idle",
      role: "Moderator",
    },
    {
      id: "3",
      username: "Member 1",
      avatar: "https://cdn.discordapp.com/embed/avatars/3.png",
      status: "online",
    },
    {
      id: "4",
      username: "Member 2",
      avatar: "https://cdn.discordapp.com/embed/avatars/4.png",
      status: "dnd",
    },
    {
      id: "5",
      username: "Member 3",
      avatar: "https://cdn.discordapp.com/embed/avatars/5.png",
      status: "offline",
    },
  ];

  // Group members by role
  const groupedMembers = members.reduce(
    (acc, member) => {
      const role = member.role || "Members";
      if (!acc[role]) {
        acc[role] = [];
      }
      acc[role].push(member);
      return acc;
    },
    {} as Record<string, Member[]>
  );

  const filteredMembers = searchQuery
    ? members.filter((member) =>
        member.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : members;

  return (
    <div className="w-full h-full bg-(--background-base-lowest) flex flex-col">
      {/* Search Bar */}
      <div className="px-3 py-2.5 border-b border-(--border-normal)">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-7 px-2.5 bg-(--background-secondary) border border-(--border-normal) rounded text-sm text-(--text-primary) placeholder-(--text-placeholder) focus:outline-none focus:ring-1 focus:ring-(--accent-primary)"
        />
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {!searchQuery ? (
          // Grouped by role
          Object.entries(groupedMembers).map(([role, roleMembers]) => (
            <div key={role} className="mb-4">
              <div className="text-[12px] uppercase text-(--text-tertiary) font-semibold px-2 mb-1.5 tracking-wide">
                {role} — {roleMembers.length}
              </div>
              <div className="space-y-0.5">
                {roleMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-2 px-2 py-1 rounded hover:bg-(--background-secondary) cursor-pointer transition-colors group"
                  >
                    {/* Avatar with Status */}
                    <div className="relative shrink-0">
                      <img
                        src={member.avatar}
                        alt={member.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span
                        className={clsx(
                          "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-(--background-base-lowest)",
                          member.status === "online" && "bg-(--status-online)",
                          member.status === "idle" && "bg-(--status-idle)",
                          member.status === "dnd" && "bg-(--status-dnd)",
                          member.status === "offline" && "bg-(--status-offline)"
                        )}
                      />
                    </div>

                    {/* Username */}
                    <span className="text-sm text-(--text-primary) truncate flex-1">
                      {member.username}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Filtered list
          <div className="space-y-0.5">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-(--background-secondary) cursor-pointer transition-colors"
              >
                <div className="relative shrink-0">
                  <img
                    src={member.avatar}
                    alt={member.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span
                    className={clsx(
                      "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-(--background-base-lowest)",
                      member.status === "online" && "bg-(--status-online)",
                      member.status === "idle" && "bg-(--status-idle)",
                      member.status === "dnd" && "bg-(--status-dnd)",
                      member.status === "offline" && "bg-(--status-offline)"
                    )}
                  />
                </div>
                <span className="text-sm text-(--text-primary) truncate flex-1">
                  {member.username}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
