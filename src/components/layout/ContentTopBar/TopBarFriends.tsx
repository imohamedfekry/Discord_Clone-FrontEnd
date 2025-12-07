"use client";

import React from "react";
import clsx from "clsx";
import { useFriendsTab, type FriendsTab } from "@/context/FriendsTabContext";

export default function TopBarFriends() {
  const { activeTab, setActiveTab } = useFriendsTab();

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
        return "text-(--status-success) bg-(--status-success)/10";
      }
      return "text-(--text-primary) bg-(--background-modifier-selected)";
    } else {
      if (tabId === "addFriend") {
        return "text-white bg-(--status-success)";
      }
      return "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--background-modifier-hover)";
    }
  };

  return (
    <div className="h-[50px] border-b border-t border-(--border-normal) flex items-center px-4 select-none">
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