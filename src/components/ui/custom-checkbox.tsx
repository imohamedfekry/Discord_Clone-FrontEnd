'use client'

import { useState, useEffect } from 'react'
import { cn } from '../utils/cn'

interface CustomCheckboxProps {
  id: string
  label?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
  labelClassName?: string
  disabled?: boolean
}

export function CustomCheckbox({
  id,
  label,
  checked = false,
  onChange,
  className,
  labelClassName,
  disabled = false
}: CustomCheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked)

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const handleChange = () => {
    if (disabled) return

    const newChecked = !isChecked
    setIsChecked(newChecked)
    onChange?.(newChecked)
  }

  return (
    <div className={cn('flex items-start space-x-3', className)}>
      <div className="relative shrink-0">
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
        />
        <label
          htmlFor={id}
          className={cn(
            'flex items-center justify-center w-6 h-6 border border-(--text-secondary) rounded cursor-pointer transition-all duration-300',
            isChecked && 'bg-(--bg-brand) border-(--bg-brand)',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <svg
            className={cn(
              'w-3 h-3 text-white transition-all duration-300',
              isChecked ? 'opacity-100' : 'opacity-0'
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </label>
      </div>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'text-(--text-secondary) text-sm leading-relaxed cursor-pointer select-none',
            disabled && 'opacity-50 cursor-not-allowed',
            labelClassName
          )}
        >
          {label}
        </label>
      )}
    </div>
  )
}
