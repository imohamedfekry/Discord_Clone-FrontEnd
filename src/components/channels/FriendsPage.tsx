"use client";

import React from "react";

export default function FriendsPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-(--background-base-low)">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="mb-4">
            <svg
              className="w-32 h-32 mx-auto text-(--text-tertiary)"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.1 0-80-35.9-80-80S55.9 20 100 20s80 35.9 80 80-35.9 80-80 80z" />
              <circle cx="70" cy="70" r="12" />
              <circle cx="130" cy="70" r="12" />
              <path d="M100 120c-20 0-35-10-40-20h80c-5 10-20 20-40 20z" />
            </svg>
          </div>
          <h2 className="text-[22px] font-semibold text-(--text-primary) mb-2">
            Wumpus is waiting on friends.
          </h2>
          <p className="text-sm text-(--text-secondary) leading-relaxed">
            No one's around to play with Wumpus. You can add friends with their Discord username.
          </p>
        </div>
      </div>
    </div>
  );
}
