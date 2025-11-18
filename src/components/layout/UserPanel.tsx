"use client";

import clsx from "clsx";
import Tooltip from "../ui/Tooltip";

export default function UserPanel() {
  return (
    <div className="absolute left-2 bottom-2 right-2 z-10 w-fit">
      <div className="h-[60px] bg-(--background-secondary) border border-(--border-normal) rounded-lg overflow-hidden w-[calc(var(--dmbar-width)+55px)]">
        {/* نفس ارتفاع MessageInput */}
        <div className="flex items-center justify-between px-2 h-full">
          {/* User Info */}
          <div className="flex items-center gap-1.5">
            <Tooltip text={"mohamed"} side="right">
              <div className="relative cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-(--bg-brand) flex items-center justify-center text-white font-semibold text-sm
                  hover:rounded-2xl transition-all duration-200">
                  {"mohamed".charAt(0)}
                </div>
                {/* <div
                  className={clsx(
                    "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-(--background-base-lowest)",
                    "online" === "online"
                      ? "bg-(--status-online)"
                      : "idle" === "idle"
                      ? "bg-(--status-idle)"
                      : "dnd" === "dnd"
                      ? "bg-(--status-dnd)"
                      : "bg-(--status-offline)"
                  )}
                /> */}
              </div>
            </Tooltip>

            <div className="min-w-0">
              <div className="text-sm font-semibold text-(--text-primary) truncate">{"mohamed"}</div>
              <div className="text-xs text-(--text-secondary) capitalize">{"mohamed"}</div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-2 h-full">
            {/* ... نفس الأزرار كما في السابق ... */}
          </div>
        </div>
      </div>
    </div>
  );
}









        //   ${
        //   activeView === "server" && activeChannelObj?.type === "voice"
        //     ? "pb-0"
        //     : ""
        // }
      
        /* {activeView === "server" && activeChannelObj?.type === "voice" && (
          <div className="px-3 py-2.5 border-b border-[#2c2d31]">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#23a559]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 1 0 6 0V6a3 3 0 0 0-3-3Zm7 9a7 7 0 0 1-14 0H3a9 9 0 0 0 18 0h-2Z" />
                </svg>
                <span className="text-xs font-semibold text-[#23a559] tracking-tight">
                  Voice Connected
                </span>
              </div>
              <button
                className="p-1 rounded hover:bg-[#3f4248] text-[#b5bac1]"
                title="Connection Info"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9Zm1 14h-2v-2h2Zm0-4h-2V7h2Z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#dbdee1] text-sm">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm-9 9a9 9 0 1 1 18 0H3Z" />
                </svg>
                <span className="text-[13px] font-medium">
                  {activeChannelObj.name}
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  className="p-1.5 rounded hover:bg-[#3f4248] text-[#b5bac1]"
                  title="Mute"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 3C10.34 3 9 4.34 9 6V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V6C15 4.34 13.66 3 12 3Z" />
                  </svg>
                </button>
                <button
                  className="p-1.5 rounded hover:bg-[#3f4248] text-[#b5bac1]"
                  title="Deafen"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
                  </svg>
                </button>
                <button
                  className="p-1.5 rounded hover:bg-[#f23f43]/10 text-[#f23f43]"
                  title="Disconnect"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 12h10v2H3zm11-8h2v16h-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )} */