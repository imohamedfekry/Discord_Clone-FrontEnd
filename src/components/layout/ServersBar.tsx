"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Tooltip from "../ui/Tooltip";

// =============================
// Discord-like ServerBar
// =============================
export default function ServersBar() {
  const [hoveredServer, setHoveredServer] = useState<string | null>(null);

  // ===================================================
  // 💅 Discord-accurate Styling & Hover Effects
  // ===================================================
  return (
    <nav
      className="w-[72px] bg-[#121214] flex flex-col items-center gap-2 h-full select-none overflow-visible pb-[72px] flex-none">
      {/* === Discord Home Icon === */}
      <Tooltip text="Direct Messages" side="right">

        <div className="relative group bg-(--bg-brand) w-10 h-10 flex items-center justify-center rounded-md">
          {/* Left indicator */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            className="relative z-10"
          >
            <path d="M19.73 4.87a18.2 18.2 0 0 0-4.6-1.44c-.21.4-.4.8-.58 1.21-1.69-.25-3.4-.25-5.1 0-.18-.41-.37-.82-.59-1.2-1.6.27-3.14.75-4.6 1.43A19.04 19.04 0 0 0 .96 17.7a18.43 18.43 0 0 0 5.63 2.87c.46-.62.86-1.28 1.2-1.98-.65-.25-1.29-.55-1.9-.92.17-.12.32-.24.47-.37 3.58 1.7 7.7 1.7 11.28 0l.46.37c-.6.36-1.25.67-1.9.92.34.7.75 1.35 1.2 1.98 2.03-.63 3.94-1.6 5.64-2.87.47-4.87-.78-9.09-3.3-12.83ZM8.3 15.12c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.89 2.27-2 2.27Zm7.4 0c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.88 2.27-2 2.27Z" />
          </svg>
        </div>
      </Tooltip>

      {/* Divider */}

      {/* === Servers List === */}
      <div className="flex-1 overflow-y-auto overflow-x-visible w-full scrollbar-hide flex flex-col items-center gap-2 pt-2 border-t border-(--border-normal)"></div>

      {/* === Add Server === */}
      <Tooltip text="Add a Server" side="right">
        <button
          aria-label="Add Server"
          className="relative w-12 h-12 bg-[#1a1a1e] text-[#3ba55d] text-3xl flex items-center justify-center transition-all duration-200 hover:bg-[#3ba55d] hover:text-white rounded-3xl hover:rounded-2xl overflow-hidden group"
        >
          <span className="relative z-10">+</span>
        </button>
      </Tooltip>

      {/* === Explore Public Servers === */}
      {/* <Tooltip text="Explore Public Servers" side="right">
        <button
          aria-label="Explore Public Servers"
          className="relative w-12 h-12 bg-[#1a1a1e] text-[#23a559] flex items-center justify-center transition-all duration-200 hover:bg-[#23a559] hover:text-white rounded-3xl hover:rounded-2xl overflow-hidden group"
        >
          <svg className="relative z-10 w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/>
          </svg>
        </button>
      </Tooltip> */}
    </nav>
  );
}
