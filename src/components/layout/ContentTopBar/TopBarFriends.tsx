"use client";

import React, { useState } from "react";
import clsx from "clsx";

type FriendsTab = "all" | "online" | "pending" | "blocked" | "addFriend";

export default function TopBarFriends() {
  const [activeTab, setActiveTab] = useState<FriendsTab>("all");

  const tabs: { id: FriendsTab; label: string }[] = [
    { id: "online", label: "Online" },
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "blocked", label: "Blocked" },
    { id: "addFriend", label: "Add Friend" },
  ];

  const handleTabClick = (tabId: FriendsTab) => {
    setActiveTab(tabId);
  };

  const getTabStyles = (tabId: FriendsTab) => {
    if (activeTab === tabId) {
      if (tabId === "addFriend") {
        return "text-[#8185e6] bg-[#242649]";
      }
      return "text-white bg-[#393c43]";
    } else {
      if (tabId === "addFriend") {
        return "text-white bg-(--bg-brand)";
      }
      return "text-[#b5bac1] hover:text-white hover:bg-[#35373c]";
    }
  };

  return (
    <div className="h-[50px] border-b border-t border-(--border-normal) flex items-center px-4 bg-[#2b2d31] select-none">
      <div className="flex items-center gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={clsx("relative text-[15px] font-medium p-4 transition rounded-md", getTabStyles(tab.id))}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}