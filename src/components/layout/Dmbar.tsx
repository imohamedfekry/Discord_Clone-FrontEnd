"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
export default function DmBar() {
  const [isResizing, setIsResizing] = useState(false);

  const dmBarRef = useRef<HTMLDivElement>(null);

  // Load saved width from localStorage or use default
  const [width, setWidth] = useState(() => {
    if (typeof window !== "undefined") {
      const savedWidth = localStorage.getItem("dmbar-width");
      return savedWidth ? parseInt(savedWidth, 10) : 240;
    }
    return 240;
  });


  // Save width to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dmbar-width", width.toString());
    }
  }, [width]);

  // Handle mouse move for resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = e.clientX - 72; // 72px is ServersBar width

      // Min width: 200px, Max width: 500px
      if (newWidth >= 200 && newWidth <= 500) {
        setWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <aside
      ref={dmBarRef}
      data-dmbar
      className={clsx(
        "bg-[#121214] text-white flex flex-col h-full relative pb-[72px] flex-none shrink-0 border border-[#202024]",
        isResizing && "select-none"
      )}
      style={{
        width: `${width}px`,
        minWidth: "200px",
        maxWidth: "500px",
        cursor: isResizing ? "col-resize" : "default",
      }}
    >


      {/* Resize Handle */}
      <div
        className={clsx(
          "absolute top-0 right-0 w-0.5 h-full cursor-col-resize transition-colors z-10",
          isResizing ? "bg-[#232428]" : "bg-transparent hover:bg-[#232428]/50"
        )}
        onMouseDown={() => setIsResizing(true)}
        title="Drag to resize"
      >
        {/* Wider hit area for easier grabbing */}
        <div className="absolute inset-y-0 -right-2 w-1" />
      </div>

      {/* Overlay during resize to prevent interference */}
      {isResizing && (
        <div
          className="fixed inset-0 z-50 cursor-col-resize"
          style={{ pointerEvents: "all" }}
        />
      )}
    </aside>
  );
}