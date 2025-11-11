// src/components/ui/Badge.tsx
import clsx from "clsx";
import { LucideIcon } from "lucide-react";

interface BadgeProps {
  count?: number;
  label?: string;
  icon?: LucideIcon;
  color?: "red" | "gray" | "green" | string;
  size?: "sm" | "md";
}

export const Badge = ({ count, label, icon: Icon, color = "red", size = "sm" }: BadgeProps) => {
  const baseClasses = clsx(
    "inline-flex items-center justify-center font-semibold",
    size === "sm" ? "text-xs px-1.5 py-0.5" : "text-sm px-2 py-1",
    color === "red" ? "bg-red-500 text-white" :
    color === "gray" ? "bg-gray-500 text-white" :
    `bg-${color}-500 text-white`,
    "rounded-full"
  );

  return (
    <span className={baseClasses}>
      {Icon && <Icon className="w-3 h-3 mr-1" />}
      {label ?? count}
    </span>
  );
};
{/*
// Usage =>

<Badge count={5} color="red" />                            // notification
<Badge label="New" color="gray" />                        // label
<Badge icon={Star} label="Pro" color="green" />          // role badge 

// */}