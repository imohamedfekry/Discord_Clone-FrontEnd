"use client";

import React from "react";

export default function TopBar() {


  return (
    <header className="flex items-center justify-between bg-(--background-base-lowest) shadow-md shrink-0 ">
      {/* Left - Navigation */}
      <div className="flex items-center gap-3"> 
        <button 
          className="text-(--text-secondary) hover:text-(--text-primary) transition-colors p-1.5 rounded hover:bg-(--background-secondary)"
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3.3 11.3a1 1 0 0 0 0 1.4l5 5a1 1 0 0 0 1.4-1.4L6.42 13H20a1 1 0 1 0 0-2H6.41l3.3-3.3a1 1 0 0 0-1.42-1.4l-5 5Z" />
          </svg>
        </button>
        <button 
          className="text-(--text-secondary) hover:text-(--text-primary) transition-colors p-1.5 rounded hover:bg-(--background-secondary)"
          aria-label="Forward"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.7 12.7a1 1 0 0 0 0-1.4l-5-5a1 1 0 1 0-1.4 1.4l3.29 3.3H4a1 1 0 1 0 0 2h13.59l-3.3 3.3a1 1 0 0 0 1.42 1.4l5-5Z" />
          </svg>
        </button>
      </div>

      {/* Middle - Title */}
      <div className="flex-1 text-left ml-6">
        <h1 className="text-(--text-primary) text-[15px] font-semibold text-center">
         test title
        </h1>
      </div>

      {/* Right - Actions */}

    </header>
  );
}
