"use client";

import React, { useState } from "react";
import clsx from "clsx";

type FriendsTab = "all" | "online" | "pending" | "blocked";

export default function TopBarFriends() {
  const [activeTab, setActiveTab] = useState<FriendsTab>("all");

  const tabs: { id: FriendsTab; label: string }[] = [
    { id: "all", label: "Friends" },
    { id: "online", label: "Online" },
    { id: "pending", label: "Pending" },
    { id: "blocked", label: "Blocked" },
  ];

  return (
    <div className="h-[50px] border-b border-t border-(--border-normal) flex items-center px-4 bg-(--background-secondary) ">
      {/* Left: Tabs */}
      <div className="flex items-center gap-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "text-base font-medium transition-colors px-2 py-1.5 relative rounded-md hover:bg-zinc-700",
              activeTab === tab.id
                ? "text-(--text-primary) bg-zinc-700"
                : "text-(--text-secondary) hover:text-(--text-primary)"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <></>
            )}
          </button>
        ))}
      </div>

      {/* Right: Add Friend Button */}
      <button
        className="ml-2 bg-(--accent-primary) px-4 py-1.5 rounded-md text-base font-medium text-white transition-colors"
        aria-label="Add Friend"
      >
        Add Friend
      </button>
    </div>
  );
}
