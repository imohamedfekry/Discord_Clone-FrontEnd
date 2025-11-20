"use client";

import React, { useState } from "react";
import clsx from "clsx";

interface TopBarDMProps {
  dmId: string;
  showDmProfile?: boolean;
  onToggleDmProfile?: () => void;
}

export default function TopBarDM({
  dmId,
  showDmProfile = true,
  onToggleDmProfile,
}: TopBarDMProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock user data - replace with real data later
  const user = {
    id: dmId,
    username: "/Bk",
    avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
    status: "offline",
  };

  return (
    <div className="h-[50px] border-b border-t border-(--border-normal) flex items-center justify-between px-4 bg-(--background-secondary) ">
      {/* Left: User Info */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {/* Avatar with Status - 20px size like Discord */}
        <div className="relative shrink-0 cursor-pointer" role="button" tabIndex={0}>
          <div className="w-5 h-5 relative">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-5 h-5 rounded-full object-cover"
            />
            {/* Status Indicator - 6x6 like Discord */}
            <span
              className={clsx(
                "absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full",
                user.status === "online" && "bg-(--status-online)",
                user.status === "idle" && "bg-(--status-idle)",
                user.status === "dnd" && "bg-(--status-dnd)",
                user.status === "offline" && "bg-(--status-offline)"
              )}
            />
          </div>
        </div>

        {/* Username */}
        <h1 className="font-medium text-[16px] text-(--text-primary) truncate cursor-pointer hover:underline">
          {user.username}
        </h1>
      </div>

      {/* Right: Toolbar with Icons and Search */}
      <div className="flex items-center gap-0 shrink-0">
        {/* Call Button */}
        <button
          className="p-2 rounded hover:bg-(--background-secondary) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          aria-label="Start Voice Call"
          title="Start Voice Call"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M2 7.4A5.4 5.4 0 0 1 7.4 2c.36 0 .7.22.83.55l1.93 4.64a1 1 0 0 1-.43 1.25L7 10a8.52 8.52 0 0 0 7 7l1.12-2.24a1 1 0 0 1 1.19-.51l5.06 1.56c.38.11.63.46.63.85C22 19.6 19.6 22 16.66 22h-.37C8.39 22 2 15.6 2 7.71V7.4ZM13 3a1 1 0 0 1 1-1 8 8 0 0 1 8 8 1 1 0 1 1-2 0 6 6 0 0 0-6-6 1 1 0 0 1-1-1Z"
            />
            <path
              fill="currentColor"
              d="M13 7a1 1 0 0 1 1-1 4 4 0 0 1 4 4 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 0 1-1-1Z"
            />
          </svg>
        </button>

        {/* Video Call Button */}
        <button
          className="p-2 rounded hover:bg-(--background-secondary) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          aria-label="Start Video Call"
          title="Start Video Call"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M4 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-2.12a1 1 0 0 0 .55.9l3 1.5a1 1 0 0 0 1.45-.9V7.62a1 1 0 0 0-1.45-.9l-3 1.5a1 1 0 0 0-.55.9V7a3 3 0 0 0-3-3H4Z"
            />
          </svg>
        </button>

        {/* Pin Button */}
        <button
          className="p-2 rounded hover:bg-(--background-secondary) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          aria-label="Pinned Messages"
          title="Pinned Messages"
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
              d="M19.38 11.38a3 3 0 0 0 4.24 0l.03-.03a.5.5 0 0 0 0-.7L13.35.35a.5.5 0 0 0-.7 0l-.03.03a3 3 0 0 0 0 4.24L13 5l-2.92 2.92-3.65-.34a2 2 0 0 0-1.6.58l-.62.63a1 1 0 0 0 0 1.42l9.58 9.58a1 1 0 0 0 1.42 0l.63-.63a2 2 0 0 0 .58-1.6l-.34-3.64L19 11l.38.38ZM9.07 17.07a.5.5 0 0 1-.08.77l-5.15 3.43a.5.5 0 0 1-.63-.06l-.42-.42a.5.5 0 0 1-.06-.63L6.16 15a.5.5 0 0 1 .77-.08l2.14 2.14Z"
            />
          </svg>
        </button>

        {/* Add Friends to DM Button */}
        <button
          className="p-2 rounded hover:bg-(--background-secondary) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          aria-label="Add Friends to DM"
          title="Add Friends to DM"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M14.5 8a3 3 0 1 0-2.7-4.3c-.2.4.06.86.44 1.12a5 5 0 0 1 2.14 3.08c.01.06.06.1.12.1ZM16.62 13.17c-.22.29-.65.37-.92.14-.34-.3-.7-.57-1.09-.82-.52-.33-.7-1.05-.47-1.63.11-.27.2-.57.26-.87.11-.54.55-1 1.1-.92 1.6.2 3.04.92 4.15 1.98.3.27-.25.95-.65.95a3 3 0 0 0-2.38 1.17ZM15.19 15.61c.13.16.02.39-.19.39a3 3 0 0 0-1.52 5.59c.2.12.26.41.02.41h-8a.5.5 0 0 1-.5-.5v-2.1c0-.25-.31-.33-.42-.1-.32.67-.67 1.58-.88 2.54a.2.2 0 0 1-.2.16A1.5 1.5 0 0 1 2 20.5a7.5 7.5 0 0 1 13.19-4.89ZM9.5 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.5 22Z"
            />
            <path
              fill="currentColor"
              d="M19 14a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z"
            />
          </svg>
        </button>

        {/* User Profile Toggle Button */}
        <button
          onClick={onToggleDmProfile}
          className={clsx(
            "p-2 rounded transition-colors",
            showDmProfile
              ? "bg-(--background-secondary) text-(--text-primary)"
              : "hover:bg-(--background-secondary) text-(--text-secondary) hover:text-(--text-primary)"
          )}
          aria-label={showDmProfile ? "Hide User Profile" : "Show User Profile"}
          title={showDmProfile ? "Hide User Profile" : "Show User Profile"}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M23 12.38c-.02.38-.45.58-.78.4a6.97 6.97 0 0 0-6.27-.08.54.54 0 0 1-.44 0 8.97 8.97 0 0 0-11.16 3.55c-.1.15-.1.35 0 .5.37.58.8 1.13 1.28 1.61.24.24.64.15.8-.15.19-.38.39-.73.58-1.02.14-.21.43-.1.4.15l-.19 1.96c-.02.19.07.37.23.47A8.96 8.96 0 0 0 12 21a.4.4 0 0 1 .38.27c.1.33.25.65.4.95.18.34-.02.76-.4.77L12 23a11 11 0 1 1 11-10.62ZM15.5 7.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
            <path fill="currentColor" d="M24 19a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />
          </svg>
        </button>

        {/* Search Bar - Like Discord */}
        <div className="ml-2 relative">
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
        </div>
      </div>
    </div>
  );
}
