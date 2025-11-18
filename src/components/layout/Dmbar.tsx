"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { Badge } from "../ui/Badge";
import { UsersIcon } from "../assets/icons/friends";
import { MessageRequestsIcon } from "../assets/icons/message-requests";
import { NitroIcon } from "../assets/icons/nitro";
import { ShopIcon } from "../assets/icons/shop";
import { FamilyCenterIcon } from "../assets/icons/family-center";
import { QuestsIcon } from "../assets/icons/quests";

export default function DmBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isResizing, setIsResizing] = useState(false);
  const dmBarRef = useRef<HTMLDivElement>(null);

  // Width state
  const [width, setWidth] = useState<number | null>(null);
  
  // Get active DM ID from pathname
  const activeDMId = pathname?.startsWith("/channels/@me/") 
    ? pathname.split("/channels/@me/")[1] 
    : pathname?.startsWith("/channels/@me/")
    ? pathname.split("/channels/@me/")[1]
    : null;

  // Load width
  useEffect(() => {
    const savedWidth = localStorage.getItem("dmbar-width");
    setWidth(savedWidth ? parseInt(savedWidth, 10) : 260);
  }, []);

  // Save width + CSS variable
  useEffect(() => {
    if (width !== null) {
      document.documentElement.style.setProperty("--dmbar-width", `${width}px`);
      localStorage.setItem("dmbar-width", width.toString());
    }
  }, [width]);

  // Resize logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = e.clientX - 72;
      if (newWidth >= 200 && newWidth <= 350) setWidth(newWidth);
    };

    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  if (width === null) {
    return null;
  }

  const dms = [
    {
      id: "1",
      name: "Klar",
      status: "mobile",
      avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
    },
    {
      id: "2",
      name: "EVIL BC",
      status: "idle",
      avatar: "https://cdn.discordapp.com/embed/avatars/2.png",
    },
    {
      id: "3",
      name: "Yousef",
      status: "online",
      avatar: "https://cdn.discordapp.com/embed/avatars/3.png",
      tag: "Soul",
    },
  ];

  return (
    <aside
      ref={dmBarRef}
      className={clsx(
        "bg-(--background-base-lowest) text-(--text-primary) flex flex-col h-full relative border-t border-(--border-normal) overflow-hidden flex-none",
        isResizing && "select-none"
      )}
      style={{
        width: `${width}px`,
        cursor: isResizing ? "col-resize" : "default",
      }}
    >
      {/* Resize handle */}
      <div
        className={clsx(
          "absolute top-0 right-0 w-0.5 h-full cursor-ew-resize transition-colors z-10",
          isResizing
            ? "bg-(--background-secondary-alt)/90"
            : "bg-transparent hover:bg-(--background-secondary-alt)/90"
        )}
        onMouseDown={() => setIsResizing(true)}
        title="Drag to resize"
      >
        <div className="absolute inset-y-0 -right-2 w-1" />
      </div>

      {isResizing && (
        <div
          className="fixed inset-0 z-50 cursor-ew-resize"
          style={{ pointerEvents: "all" }}
        />
      )}

      {/* Search Bar */}

      <div className="px-2 py-1.5 border-b border-(--border-normal)">
        <button
          className="cursor-pointer w-full font-medium bg-(--background-secondary) text-white text-sm placeholder-(--text-placeholder) py-2 rounded-lg text-center hover:bg-(--background-input) transition-colors"
          // onClick={() => alert("Search clicked")}
        >
          {" "}
          Find or start a conversation{" "}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-col px-2 gap-1 py-2 border-b border-(--border-normal)">
        {/* Friends */}
        <div
          onClick={() => router.push("/channels/@me")}
          className={clsx(
            "flex items-center justify-between px-2 py-2 rounded-[5px] cursor-pointer transition-colors",
            pathname === "/channels/@me" || pathname === "/channels/@me"
              ? "bg-(--background-secondary) text-(--text-primary)"
              : "text-(--text-secondary) hover:bg-(--background-secondary) hover:text-(--text-primary)"
          )}
        >
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5" />
            <span className="text-[14px]">Friends</span>
          </div>
          <Badge count={34} size="sm" />
        </div>

        {/* Message Requests */}
        {/* <div className="flex items-center justify-between px-2 py-2 text-(--text-secondary) hover:bg-(--background-secondary) hover:text-(--text-primary) rounded-[5px] cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <MessageRequestsIcon className="w-5 h-5" />
            <span className="text-[14px]">Message Requests</span>
          </div>
          <Badge count={7} size="sm" />
        </div> */}

        {/* Nitro Home */}
        {/* <div className="flex items-center justify-between px-2 py-2 text-(--text-secondary) hover:bg-(--background-secondary) hover:text-(--text-primary) rounded-[5px] cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <NitroIcon className="w-5 h-5" />
            <span className="text-[14px]">Nitro Home</span>
          </div>
          <Badge
            size="sm"
            label="DISCOUNT"
            color="gray"
            icon={
              <svg
                aria-hidden="true"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm1-18a1 1 0 1 0-2 0v7c0 .27.1.52.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.58V5Z"
                  clipRule="evenodd"
                  className=""
                ></path>
              </svg>
            }
          />
        </div>

        {/* Shop */}
        {/* <div className="flex items-center justify-between px-2 py-2 text-(--text-secondary) hover:bg-(--background-secondary) hover:text-(--text-primary) rounded-[5px] cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <ShopIcon className="w-5 h-5" />
            <span className="text-[14px]">Shop</span>
          </div>
        </div> */}

        {/* Family Center */}
        {/* <div className="flex items-center justify-between px-2 py-2 text-(--text-secondary) hover:bg-(--background-secondary) hover:text-(--text-primary) rounded-[5px] cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <FamilyCenterIcon className="w-5 h-5" />
            <span className="text-[14px]">Family Center</span>
          </div>
        </div> */}

        {/* Quests */}
        {/* <div className="flex items-center justify-between px-2 py-2 text-(--text-secondary) hover:bg-(--background-secondary) hover:text-(--text-primary) rounded-[5px] cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <QuestsIcon className="w-5 h-5" />
            <span className="text-[14px]">Quests</span>
          </div>
        </div> */}
      </div> 

      {/* DMs Section */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-3 py-2 text-xs uppercase text-(--text-tertiary) flex items-center justify-between">
          <span>Direct Messages</span>
          <button className="text-(--text-secondary) hover:text-(--text-primary) text-lg leading-none transition-colors">
            ＋
          </button>
        </div>

        <div className="flex flex-col gap-1 px-2">
          {dms.map((dm) => {
            const isActive = activeDMId === dm.id;
            return (
              <div key={dm.id}>
                <div
                  onClick={() => router.push(`/channels/@me/${dm.id}`)}
                  className={clsx(
                    "flex items-center rounded-[5px] cursor-pointer gap-1 transition-colors",
                    isActive
                      ? "bg-(--background-secondary-alt)"
                      : "hover:bg-(--background-secondary)"
                  )}
                >
                  <div className="relative p-1">
                    <img
                      src={dm.avatar}
                      alt={dm.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span
                      className={clsx(
                        "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-(--background-base-lowest)",
                        dm.status === "online" && "bg-(--status-online)",
                        dm.status === "idle" && "bg-(--status-idle)",
                        dm.status === "mobile" && "bg-(--status-online)"
                      )}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-(--text-primary)">
                      {dm.name}
                    </span>
                    {dm.tag && (
                      <span className="text-[10px] bg-(--bg-brand)/20 text-(--bg-brand) px-1.5 py-0.5 rounded-md w-fit mt-0.5">
                        {dm.tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Padding - Space for UserPanel + MessageInput */}
      <div className="h-[60px]" />
    </aside>
  );
}
