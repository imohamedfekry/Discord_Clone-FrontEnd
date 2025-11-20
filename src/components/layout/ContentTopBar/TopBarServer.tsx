"use client";

import React, { useState } from "react";
import clsx from "clsx";

interface TopBarServerProps {
  serverId: string;
  channelId: string;
}

export default function TopBarServer({ serverId, channelId }: TopBarServerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock channel data - replace with real data later
  const channel = {
    id: channelId,
    name: "general",
    type: "text",
  };

  return (
    <div className="h-[50px] border-b border-t border-(--border-normal) flex items-center justify-between px-4 bg-(--background-secondary) ">
      {/* Left: Channel Name */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {/* Hash Icon for Text Channel */}
        {channel.type === "text" && (
          <svg
            className="w-5 h-5 text-(--text-secondary) shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 15L8.35045 9H14.3505L15.4105 15H9.41045Z" />
          </svg>
        )}

        {/* Voice Icon for Voice Channel */}
        {channel.type === "voice" && (
          <svg
            className="w-5 h-5 text-(--text-secondary) shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3C10.34 3 9 4.34 9 6V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V6C15 4.34 13.66 3 12 3ZM19 10V12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12V10H3V12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12V10H19Z" />
          </svg>
        )}

        <h1 className="font-medium text-[16px] text-(--text-primary) truncate">
          {channel.name}
        </h1>
      </div>

      {/* Right: Search Bar & Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search Bar - Like Discord */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[144px] h-[24px] px-2 pr-8 bg-(--background-secondary) border border-(--border-normal) rounded text-sm text-(--text-primary) placeholder-(--text-placeholder) focus:outline-none focus:ring-1 focus:ring-(--accent-primary)"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-(--background-secondary-alt) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
              aria-label="Clear"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z"
                />
              </svg>
            </button>
          ) : (
            <svg
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-secondary) pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15.62 17.03a9 9 0 1 1 1.41-1.41l4.68 4.67a1 1 0 0 1-1.42 1.42l-4.67-4.68ZM17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        {/* Inbox Button */}
        <button
          className="p-2 rounded hover:bg-(--background-secondary) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          aria-label="Inbox"
          title="Inbox"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z"
            />
          </svg>
        </button>

        {/* Help Button */}
        <button
          className="p-2 rounded hover:bg-(--background-secondary) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          aria-label="Help"
          title="Help"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.67 11.45 12.9 12.17 12.17L13.1 11.25C13.45 10.9 13.67 10.5 13.67 10C13.67 9.17 13.17 8.67 12.33 8.67C11.5 8.67 11 9.17 11 10H9C9 8.33 10.17 7.17 11.83 7.17C13.5 7.17 14.67 8.33 14.67 10C14.67 10.88 14.25 11.75 15.07 11.25Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
