"use client";

import React from "react";
import Tooltip from "../ui/Tooltip";
import clsx from "clsx";
import { Badge } from "../ui/Badge";
import { AddServerIcon } from "../assets/icons/add-server";
import { ExploreServersIcon } from "../assets/icons/explore-server";

export default function ServersBar() {
  return (
    <nav
      className={clsx(
        "w-[72px] h-screen flex flex-col items-center bg-(--background-base-lowest)",
        "select-none flex-none border-r border-(--border-normal)",
        "overflow-y-auto overflow-x-hidden scrollbar-hide"
      )}
    >
      {/* ======= Top Section ======= */}
      <div className="flex flex-col items-center w-ful gap-1">
        {/* Discord Home */}
        <Tooltip text="Direct Messages" side="right">
          <button
            aria-label="Home"
            className={clsx(
              "relative w-10 h-10 flex items-center justify-center bg-(--bg-brand) rounded-lg transition-all "
            )}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="white"
              className="relative z-10"
            >
              <path d="M19.73 4.87a18.2 18.2 0 0 0-4.6-1.44c-.21.4-.4.8-.58 1.21-1.69-.25-3.4-.25-5.1 0-.18-.41-.37-.82-.59-1.2-1.6.27-3.14.75-4.6 1.43A19.04 19.04 0 0 0 .96 17.7a18.43 18.43 0 0 0 5.63 2.87c.46-.62.86-1.28 1.2-1.98-.65-.25-1.29-.55-1.9-.92.17-.12.32-.24.47-.37 3.58 1.7 7.7 1.7 11.28 0l.46.37c-.6.36-1.25.67-1.9.92.34.7.75 1.35 1.2 1.98 2.03-.63 3.94-1.6 5.64-2.87.47-4.87-.78-9.09-3.3-12.83ZM8.3 15.12c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.89 2.27-2 2.27Zm7.4 0c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.88 2.27-2 2.27Z" />
            </svg>
          </button>
        </Tooltip>

        {/* Unread DMs bubble */}
        {/* <div className="flex flex-col items-center gap-1">
          <Tooltip text="mohamed" side="right">
            <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-(--background-secondary) hover:bg-(--background-secondary-alt) transition-colors duration-200 relative">
              <div className="absolute right-[-4px] bottom-[-4px]">
                <Badge count={2} border={true}  />
              </div>
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-(--text-secondary)"
                fill="currentColor"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h9l7 7v9a2 2 0 0 1-2 2zM13 3.5V9h5.5L13 3.5z" />
              </svg>
            </div>
          </Tooltip>
        </div> */}
        <div className="w-8 h-0.5 bg-(--border-normal) rounded" />
      </div>

      {/* ======= Servers Scroll List ======= */}
      <div className={clsx("w-full flex flex-col items-center gap-2 mt-1")}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Tooltip key={i} text={`Server ${i + 1}`} side="right">
            <button
              aria-label={`Server ${i + 1}`}
              className="relative w-10 h-10"
            >
              <img
                src="https://cdn.discordapp.com/icons/169256939211980800/b6d536d1332bd67725ca03729348c035.png?size=100&quality=lossless"
                alt={`Server ${i + 1}`}
                className="w-full h-full rounded-lg"
              />
              <div className="absolute -right-1 -bottom-1">
                <Badge count={i + 1} border={true} />
              </div>
            </button>
          </Tooltip>
        ))}
        <Tooltip text="Add a Server" side="right">
          <button
            aria-label="Add Server"
            className="relative w-10 h-10 bg-(--background-secondary) text-slate-800 dark:text-white hover:text-white text-3xl flex items-center justify-center transition-all duration-200 hover:bg-(--bg-brand) rounded-lg"
          >
              <AddServerIcon className="w-5 h-5"  />
          </button>
        </Tooltip>

        <Tooltip text="Explore Public Servers" side="right">
          <button
            aria-label="Explore Public Servers"
            className="relative w-10 h-10 bg-(--background-secondary) text-slate-800 dark:text-white hover:text-white text-3xl flex items-center justify-center transition-all duration-200 hover:bg-(--bg-brand) rounded-lg"
          >
            <ExploreServersIcon className="w-5 h-5" />
          </button>
        </Tooltip>
      </div>

      {/* ======= Bottom Section =======
      <div className="flex flex-col items-center gap-2 py-3 w-full">
  
      </div> */}
    </nav>
  );
}
