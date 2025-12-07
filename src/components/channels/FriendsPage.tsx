"use client";

import React from "react";
import { useFriendsTab } from "@/context/FriendsTabContext";
import OnlineFriends from "./FriendsTabs/OnlineFriends";
import AllFriends from "./FriendsTabs/AllFriends";
import PendingFriends from "./FriendsTabs/PendingFriends";
import BlockedUsers from "./FriendsTabs/BlockedUsers";
import AddFriend from "./FriendsTabs/AddFriend";

export default function FriendsPage() {
  const { activeTab } = useFriendsTab();

  const renderContent = () => {
    switch (activeTab) {
      case "online":
        return <OnlineFriends />;
      case "all":
        return <AllFriends />;
      case "pending":
        return <PendingFriends />;
      case "blocked":
        return <BlockedUsers />;
      case "addFriend":
        return <AddFriend />;
      default:
        return <AllFriends />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {renderContent()}
    </div>
  );
}
