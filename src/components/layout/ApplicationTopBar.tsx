"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

export default function ApplicationTopBar() {
  const pathname = usePathname();
  const router = useRouter();

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  // Track navigation history
  useEffect(() => {
    if (typeof window === "undefined") return;

    let historyStack = JSON.parse(sessionStorage.getItem("app-history") || "[]");
    let forwardStack = JSON.parse(sessionStorage.getItem("app-forward") || "[]");

    const last = historyStack[historyStack.length - 1];

    // If navigating to a new path → push to history
    if (last !== pathname) {
      historyStack.push(pathname);
      sessionStorage.setItem("app-history", JSON.stringify(historyStack));
      // New page → forward stack cleared
      sessionStorage.setItem("app-forward", JSON.stringify([]));
      forwardStack = [];
    }

    setCanGoBack(historyStack.length > 1);
    setCanGoForward(forwardStack.length > 0);
  }, [pathname]);

  const handleBack = () => {
    let historyStack = JSON.parse(sessionStorage.getItem("app-history") || "[]");
    let forwardStack = JSON.parse(sessionStorage.getItem("app-forward") || "[]");

    if (historyStack.length > 1) {
      const current = historyStack.pop(); // Remove current page
      forwardStack.push(current); // Add to forward stack

      const previous = historyStack[historyStack.length - 1];

      sessionStorage.setItem("app-history", JSON.stringify(historyStack));
      sessionStorage.setItem("app-forward", JSON.stringify(forwardStack));

      router.push(previous);
    }
  };

  const handleForward = () => {
    let historyStack = JSON.parse(sessionStorage.getItem("app-history") || "[]");
    let forwardStack = JSON.parse(sessionStorage.getItem("app-forward") || "[]");

    if (forwardStack.length > 0) {
      const next = forwardStack.pop(); // Get next page

      historyStack.push(next);

      sessionStorage.setItem("app-history", JSON.stringify(historyStack));
      sessionStorage.setItem("app-forward", JSON.stringify(forwardStack));

      router.push(next);
    }
  };

  // Dynamic title like Discord
  const getTitle = (): string => {
    if (pathname?.startsWith("/channels/@me/")) {
      const dmId = pathname.split("/channels/@me/")[1];
      return `DM with User ${dmId}`;
    }
    if (pathname === "/channels/@me") {
      return "Friends";
    }
    if (pathname?.startsWith("/channels/")) {
      return "Server Channel";
    }
    return "Discord";
  };

  return (
    <header className="flex items-center justify-between bg-(--background-base-lowest) shrink-0 px-2">
      {/* Left Nav */}
      <div className="flex items-center gap-1">
        <button
          onClick={handleBack}
          disabled={!canGoBack}
          className={clsx(
            "transition-colors p-2 rounded",
            canGoBack
              ? "text-(--text-primary) hover:bg-(--background-secondary) cursor-pointer"
              : "text-(--text-tertiary) cursor-not-allowed opacity-50"
          )}
          aria-label="Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3.3 11.3a1 1 0 0 0 0 1.4l5 5a1 1 0 0 0 1.4-1.4L6.42 13H20a1 1 0 1 0 0-2H6.41l3.3-3.3a1 1 0 0 0-1.42-1.4l-5 5Z" />
          </svg>
        </button>

        <button
          onClick={handleForward}
          disabled={!canGoForward}
          className={clsx(
            "transition-colors p-2 rounded",
            canGoForward
              ? "text-(--text-primary) hover:bg-(--background-secondary) cursor-pointer"
              : "text-(--text-tertiary) cursor-not-allowed opacity-50"
          )}
          aria-label="Forward"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.7 12.7a1 1 0 0 0 0-1.4l-5-5a1 1 0 1 0-1.4 1.4l3.29 3.3H4a1 1 0 1 0 0 2h13.59l-3.3 3.3a1 1 0 0 0 1.42 1.4l5-5Z" />
          </svg>
        </button>
      </div>

      {/* Middle - Title */}
      <div className="flex-1 text-left ml-4">
        <h1 className="text-(--text-primary) text-[15px] text-center font-semibold">
          {getTitle()}
        </h1>
      </div>

      {/* Right side (actions) */}
      <div className="flex items-center gap-2">
        {/* Add actions here later */}
      </div>
    </header>
  );
}
