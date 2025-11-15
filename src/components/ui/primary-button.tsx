import { cn } from "../utils/cn"
import { Button } from "./Button"

interface PrimaryButtonProps {
  type?: 'submit' | 'button'
  children: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export function PrimaryButton({
  type = 'submit',
  children,
  isLoading = false,
  disabled = false,
  className,
  onClick
}: PrimaryButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center',
        'h-12 px-6 py-3 rounded-xl',
        'bg-(--accent-primary) text-white',
        'font-medium text-base',
        'transition-all duration-200',
        'hover:bg-(hsl(var(--accent-primary-h),var(--accent-primary-s),calc(var(--accent-primary-l)-var(--hover-darken)))) hover:shadow-md',
        'active:bg-[hsl(var(--accent-primary-h),var(--accent-primary-s),calc(var(--accent-primary-l)-var(--active-darken)))] active:translate-y-0 active:shadow-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-focus)',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  )
}
