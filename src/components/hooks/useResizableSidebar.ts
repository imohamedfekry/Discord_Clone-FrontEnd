"use client";

import { useEffect, useState } from "react";

interface UseResizableSidebarOptions {
  storageKey?: string;
  minWidth?: number;
  maxWidth?: number;
  /**
   * Horizontal offset from the left edge of the window to the start of the sidebar.
   * This is used to compute width as (mouseX - offsetLeft).
   */
  offsetLeft?: number;
  /** Fallback width if nothing is stored yet. */
  defaultWidth?: number;
}

export function useResizableSidebar(options: UseResizableSidebarOptions = {}) {
  const {
    storageKey = "sidebar-width",
    minWidth = 200,
    maxWidth = 350,
    offsetLeft = 72,
    defaultWidth = 260,
  } = options;

  const [width, setWidth] = useState<number | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  // Load initial width from localStorage
  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    const parsed = saved ? Number.parseInt(saved, 10) : NaN;
    setWidth(Number.isFinite(parsed) ? parsed : defaultWidth);
  }, [defaultWidth, storageKey]);

  // Persist width and expose as CSS variable for potential global usage
  useEffect(() => {
    if (width == null) return;
    window.localStorage.setItem(storageKey, String(width));
    document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
  }, [storageKey, width]);

  // Global mouse handlers while resizing
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (event: MouseEvent) => {
      const next = event.clientX - offsetLeft;
      if (next >= minWidth && next <= maxWidth) {
        setWidth(next);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, maxWidth, minWidth, offsetLeft]);

  const startResizing = () => setIsResizing(true);

  return { width, isResizing, startResizing };
}
