"use client";

import React, { useState } from "react";
import clsx from "clsx";

interface MessageInputProps {
  channelId: string;
  type: "dm" | "channel";
  placeholder?: string;
}

export default function MessageInput({ channelId, type, placeholder }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // TODO: Send message
    setMessage("");
  };

  const defaultPlaceholder = placeholder || `Message ${type === "dm" ? "@user" : "#channel"}`;

  return (
    <div className="px-4 pb-2">
      <form onSubmit={handleSubmit} className="relative flex items-center h-[60px] bg-(--background-secondary) rounded-lg border border-(--border-normal) focus-within:border-(--border-focus) transition-colors box-border">
        {/* Plus Icon - Left */}
        <button
          type="button"
          className="p-2 text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          aria-label="Add attachment"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Input Field */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={defaultPlaceholder}
          className="flex-1 bg-transparent text-(--text-primary) placeholder-(--text-placeholder) text-sm h-full px-1 focus:outline-none"
          style={{ lineHeight: "1" }}
        />

        {/* Right Icons */}
        <div className="flex items-center gap-0.5 pr-2 h-full">
          {/* Sticker Icon */}
          <button
            type="button"
            className="p-1.5 text-(--text-secondary) hover:text-(--text-primary) transition-colors rounded hover:bg-(--background-secondary) h-full flex items-center justify-center"
            aria-label="Add sticker"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 8C8.55228 8 9 7.55228 9 7C9 6.44772 8.55228 6 8 6C7.44772 6 7 6.44772 7 7C7 7.55228 7.44772 8 8 8Z" fill="currentColor" />
              <path d="M12 12C12.5523 12 13 11.5523 13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11C11 11.5523 11.4477 12 12 12Z" fill="currentColor" />
              <path d="M16 16C16.5523 16 17 15.5523 17 15C17 14.4477 16.5523 14 16 14C15.4477 14 15 14.4477 15 15C15 15.5523 15.4477 16 16 16Z" fill="currentColor" />
            </svg>
          </button>

          {/* Emoji Icon */}
          <button
            type="button"
            className="p-1.5 text-(--text-secondary) hover:text-(--text-primary) transition-colors rounded hover:bg-(--background-secondary) h-full flex items-center justify-center"
            aria-label="Add emoji"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="9" cy="9" r="1" fill="currentColor" />
              <circle cx="15" cy="9" r="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

