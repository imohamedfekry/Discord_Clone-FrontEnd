"use client";
import React from "react";

interface Props {
  isDM: boolean;
  isFriends: boolean;
  isServer: boolean;
  dmId?: string | null;
}

export default function ContentTopBar({ isDM, isFriends, isServer, dmId }: Props) {
  if (isFriends) {
    return (
      <div className="h-12 border-b border-(--border-primary) flex items-center px-4 gap-4">
        <button className="text-(--text-primary) font-semibold">Friends</button>
        <button className="text-(--text-secondary)">Online</button>
        <button className="text-(--text-secondary)">Pending</button>
        <button className="text-(--text-secondary)">Blocked</button>

        <button className="ml-auto bg-(--accent-primary) px-3 py-1 rounded">
          Add Friend
        </button>
      </div>
    );
  }

  if (isDM) {
    return (
      <div className="h-12 border-b border-(--border-primary) flex items-center px-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-600"></div>
          <span className="font-semibold">DM with {dmId}</span>
        </div>

        <div className="ml-auto flex gap-3">
          <button>📞</button>
          <button>🎥</button>
          <button>👤</button>
        </div>
      </div>
    );
  }

  if (isServer) {
    return (
      <div className="h-12 border-b border-(--border-primary) flex items-center px-4 gap-4">
        <span className="font-semibold"># general</span>

        <div className="ml-auto">
          <input
            placeholder="Search"
            className="px-2 py-1 bg-(--background-base-lower) rounded"
          />
        </div>
      </div>
    );
  }

  return null;
}
