// src/components/ui/Badge.tsx
import clsx from "clsx";

interface BadgeProps {
  count?: number;
  label?: string;
  icon?: any;
  color?: "red" | "gray" | "green" | "brand" | string;
  size?: "sm" | "md";
  border?: boolean;
}

export const Badge = ({ count, label, icon: Icon, color = "red", size = "md" , border}: BadgeProps) => {
  // Check if it's count-only (number badge) for perfect circle
  const isCountOnly = count !== undefined && !label && !Icon;
  
  const baseClasses = clsx(
    "items-center justify-center font-black text-center inline-flex",
    "rounded-full leading-none",
    border && "border-2 border-[var(--background-base-lowest)]",
    // Size styles - use equal padding and min dimensions for perfect circle
    size === "sm" 
      ? clsx(
          "text-xs",
          isCountOnly ? "min-w-[18px] min-h-[18px] px-0" : "px-1.5 py-0.5"
        )
      : clsx(
          "text-sm",
          isCountOnly ? "min-w-[22px] min-h-[22px] px-0" : "px-2 py-1"
        ),
    // Color styles
    color === "red" && "bg-[var(--status-danger)] text-white",
    color === "gray" && "bg-[var(--text-tertiary)] text-white",
    color === "green" && "bg-[var(--status-success)] text-white",
    color === "brand" && "bg-[var(--bg-brand)] text-white",
    !["red", "gray", "green", "brand"].includes(color) && `bg-${color}-500 text-white`
  );

  return (
    <span className={baseClasses}>
      {Icon && (
        <span className="flex items-center justify-center mr-1 w-4 h-4">
          {Icon}
        </span>
      )}
      {label ?? count}
    </span>
  );
};
// 
{/* <Badge count={5} color="red" />          // notification
<Badge label="New" color="gray" />       // label
<Badge icon={Star} label="Pro" color="green" /> // role badge */}