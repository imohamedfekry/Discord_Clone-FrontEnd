import * as React from "react";
import { cn } from "@/components/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, errorMessage, label, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col m-0">
        {/* Label */}
        {label && (
          <label className="text-(--text-primary) text-sm mb-1">
            {label}
          </label>
        )}

        {/* Input */}
        <input
          type={type}
          className={cn(
            "w-full h-12 px-4 py-3 rounded-lg",
            "bg-(--bg-input) text-(--text-primary)",
            "border border-(--border-primary)",
            "transition-all duration-200 outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "placeholder:text-(--text-placeholder)",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            error && "border-(--accent-danger)",
            className
          )}
          ref={ref}
          {...props}
        />

        {/* Error Message */}
        {error && errorMessage && (
          <p className="mt-1 text-sm text-(--accent-danger)">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
