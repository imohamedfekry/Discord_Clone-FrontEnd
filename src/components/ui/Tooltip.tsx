"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ReactElement,
  CSSProperties,
} from "react";
import { createPortal } from "react-dom";

type Side =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "auto";

interface TooltipProps {
  text: string;
  children: ReactElement<any>;
  side?: Side;
  delay?: number;
  className?: string;
  arrowSize?: number; // حجم السهم
}

const DEFAULT_ARROW_SIZE = 4;
const GAP = 8;

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  side = "top",
  delay = 100,
  className = "",
  arrowSize = DEFAULT_ARROW_SIZE,
}) => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );
  const [finalSide, setFinalSide] = useState<Side>(side);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const showTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const clearTimers = () => {
    if (showTimer.current) clearTimeout(showTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    showTimer.current = null;
    hideTimer.current = null;
  };

  const calculatePosition = (preferredSide: Side) => {
    const trigger = triggerRef.current;
    const tip = tooltipRef.current;
    if (!trigger || !tip) return;

    const tRect = trigger.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    const centerX = tRect.left + tRect.width / 2 - tipRect.width / 2;
    const centerY = tRect.top + tRect.height / 2 - tipRect.height / 2;

    const rawCandidates = [
      { side: "top", top: tRect.top - tipRect.height - GAP, left: centerX },
      { side: "bottom", top: tRect.bottom + GAP, left: centerX },
      { side: "left", top: centerY, left: tRect.left - tipRect.width - GAP },
      { side: "right", top: centerY, left: tRect.right + GAP },
      { side: "top-left", top: tRect.top - tipRect.height - GAP, left: tRect.left },
      { side: "top-right", top: tRect.top - tipRect.height - GAP, left: tRect.right - tipRect.width },
      { side: "bottom-left", top: tRect.bottom + GAP, left: tRect.left },
      { side: "bottom-right", top: tRect.bottom + GAP, left: tRect.right - tipRect.width },
    ] as const;

    const candidates = rawCandidates.map((c) => ({
      ...c,
      top: Math.min(Math.max(c.top, 4), vh - tipRect.height - 4),
      left: Math.min(Math.max(c.left, 4), vw - tipRect.width - 4),
    }));

    const ordered =
      preferredSide === "auto"
        ? candidates
        : [
            ...candidates.filter((c) => c.side === preferredSide),
            ...candidates.filter((c) => c.side !== preferredSide),
          ];

    const fit =
      ordered.find(
        (c) =>
          c.top >= 4 &&
          c.top + tipRect.height <= vh - 4 &&
          c.left >= 4 &&
          c.left + tipRect.width <= vw - 4
      ) || ordered[0];

    setCoords({
      top: fit.top + window.scrollY,
      left: fit.left + window.scrollX,
    });
    setFinalSide(fit.side);
  };

  const onShow = () => {
    clearTimers();
    showTimer.current = window.setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => calculatePosition(side));
    }, delay);
  };

  const onHide = () => {
    clearTimers();
    hideTimer.current = window.setTimeout(() => {
      setVisible(false);
      setCoords(null);
    }, 50);
  };

  useEffect(() => {
    if (!visible) return;
    const handler = () => calculatePosition(side);
    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler, true);
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler, true);
    };
  }, [visible, side]);

  const child = React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      const ref = (children as any).ref;
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object") (ref as any).current = node;
    },
    onMouseEnter: (e: any) => {
      onShow();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: any) => {
      onHide();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: any) => {
      onShow();
      children.props.onFocus?.(e);
    },
    onBlur: (e: any) => {
      onHide();
      children.props.onBlur?.(e);
    },
    tabIndex: children.props.tabIndex ?? 0,
    "aria-describedby": visible ? "tooltip-content" : undefined,
  });

  // دالة لإرجاع ستايل السهم حسب الـ side
const getArrowStyle = (): CSSProperties => {
  const size = arrowSize;
  const offset = size;

  const base: CSSProperties = {
    position: "absolute",
    width: size * 2,
    height: size * 2,
    background: "var(--background-secondary-alt)",
    zIndex: 0,
  };

  // حدود السهم حسب الاتجاه (للتلاؤم مع دورانه 45°)
  const getBorders = () => {
    switch (finalSide) {
      case "top":
      case "top-left":
      case "top-right":
        return {
          borderRight: "1px solid var(--border-normal)",
          borderBottom: "1px solid var(--border-normal)",
        };
      case "bottom":
      case "bottom-left":
      case "bottom-right":
        return {
          borderLeft: "1px solid var(--border-normal)",
          borderTop: "1px solid var(--border-normal)",
        };
      case "left":
        return {
          borderTop: "1px solid var(--border-normal)",
          borderRight: "1px solid var(--border-normal)",
        };
      case "right":
        return {
          borderBottom: "1px solid var(--border-normal)",
          borderLeft: "1px solid var(--border-normal)",
        };
      default:
        return {
          borderRight: "1px solid var(--border-normal)",
          borderBottom: "1px solid var(--border-normal)",
        };
    }
  };

  // موضع السهم حسب الاتجاه
  const getPosition = () => {
    switch (finalSide) {
      case "top":
        return {
          left: "50%",
          bottom: -offset,
          transform: "translateX(-50%) rotate(45deg)",
        };
      case "top-left":
        return {
          left: 12, // محاذاة لليسار
          bottom: -offset,
          transform: "rotate(45deg)",
        };
      case "top-right":
        return {
          right: 15, // محاذاة لليمين
          bottom: -offset,
          transform: "rotate(45deg)",
        };
      case "bottom":
        return {
          left: "50%",
          top: -offset,
          transform: "translateX(-50%) rotate(45deg)",
        };
      case "bottom-left":
        return {
          left: 12,
          top: -offset,
          transform: "rotate(45deg)",
        };
      case "bottom-right":
        return {
          right: 12,
          top: -offset,
          transform: "rotate(45deg)",
        };
      case "left":
        return {
          right: -offset,
          top: "50%",
          transform: "translateY(-50%) rotate(45deg)",
        };
      case "right":
        return {
          left: -offset,
          top: "50%",
          transform: "translateY(-50%) rotate(45deg)",
        };
      default:
        return {
          left: "50%",
          bottom: -offset,
          transform: "translateX(-50%) rotate(45deg)",
        };
    }
  };

  return { ...base, ...getBorders(), ...getPosition() };
};

  const tooltipNode = (
    <div
      ref={tooltipRef}
      id="tooltip-content"
      role="tooltip"
      aria-hidden={!visible}
      className="pointer-events-none fixed z-9999"
      style={{
        top: coords?.top ?? -9999,
        left: coords?.left ?? -9999,
        maxWidth: 320,
      }}
    >
      {/* البالون */}
      <div
        className={`relative px-3 py-2 border border-(--border-normal) rounded-md text-sm font-semibold whitespace-nowrap bg-(--background-secondary-alt) text-(--text-primary) shadow-[0_6px_20px_rgba(0,0,0,0.6)] overflow-hidden ${className}`}
      >
        {text}
      </div>
      {/* السهم */}
      <div aria-hidden  style={getArrowStyle()} />
    </div>
  );
  return (
    <>
      {child}
      {mounted && (visible || coords)
        ? createPortal(tooltipNode, document.body)
        : null}
    </>
  );
};

export default Tooltip;
