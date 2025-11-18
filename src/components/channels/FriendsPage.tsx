"use client";

import React from "react";

export default function FriendsPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-(--background-base-lowest)">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-(--text-primary) mb-2">
            Wumpus is waiting on friends.
          </div>
          <div className="text-sm text-(--text-secondary)">
            No one's around to play with Wumpus.
          </div>
        </div>
      </div>
    </div>
  );
}

