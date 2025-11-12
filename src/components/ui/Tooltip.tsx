"use client";

import React, { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  side?:
    | "top"
    | "top-left"
    | "top-right"
    | "bottom"
    | "bottom-left"
    | "bottom-right"
    | "left"
    | "right";
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, side = "top" }) => {
  const [visible, setVisible] = useState(false);

  // المواقع بالنسبة للعنصر
  const positionClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    "top-left": "bottom-full left-0 mb-2",
    "top-right": "bottom-full right-0 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    "bottom-left": "top-full left-0 mt-2",
    "bottom-right": "top-full right-0 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  // السهم (قبل العنصر)
  const arrowClasses: Record<string, string> = {
    
    top: "after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-6 after:border-transparent after:border-t-[#434750]",
    "top-left":
      "after:content-[''] after:absolute after:top-full after:left-4 after:border-4 after:border-transparent after:border-t-[#434750]",
    "top-right":
      "after:content-[''] after:absolute after:top-full after:right-4 after:border-4 after:border-transparent after:border-t-[#434750]",
    bottom:
      "after:content-[''] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-b-[#434750]",
    "bottom-left":
      "after:content-[''] after:absolute after:bottom-full after:left-4 after:border-4 after:border-transparent after:border-b-[#434750]",
    "bottom-right":
      "after:content-[''] after:absolute after:bottom-full after:right-4 after:border-4 after:border-transparent after:border-b-[#434750]",
    left: "after:content-[''] after:absolute after:right-[-8px] after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-transparent after:border-l-[#434750]",
    right:
      "after:content-[''] after:absolute after:left-[-8px] after:top-1/2 after:-translate-y-1/2 after:border-4 after:border-transparent after:border-r-[#434750]",
  };

  return (
    <div
      className="relative "
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className={`absolute ${positionClasses[side]} ${arrowClasses[side]} 
            px-3 py-2 rounded-md bg-[#434750] text-white border border-[#4a4e5a]
            text-sm font-semibold shadow-lg whitespace-nowrap z-9999 pointer-events-none
            animate-fade-in`}
          style={{ animationDuration: "150ms" }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
