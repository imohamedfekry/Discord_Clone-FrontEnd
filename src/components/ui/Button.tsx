import React from "react"
import { cn } from "@/components/utils/cn"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    const variants = {
      default: "bg-[var(--accent-primary)] text-white hover:bg-[hsl(var(--accent-primary-h),var(--accent-primary-s),calc(var(--accent-primary-l)-var(--hover-darken)))] focus-visible:ring-[var(--border-focus)]",
      destructive: "bg-[var(--accent-danger)] text-white hover:bg-[hsl(var(--accent-danger-h),var(--accent-danger-s),calc(var(--accent-danger-l)-var(--hover-darken)))]",
      outline: "border border-[var(--border-primary)] bg-[var(--bg-input)] text-[var(--text-primary)] hover:bg-[var(--background-secondary)]",
      secondary: "bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--background-secondary-alt)]",
      ghost: "text-[var(--text-primary)] hover:bg-[var(--background-secondary)]",
      link: "text-[var(--accent-link)] underline-offset-4 hover:underline",
    }

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
