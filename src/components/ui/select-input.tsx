'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../utils/cn'

interface SelectOption {
  value: string
  label: string
}

interface SelectInputProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function SelectInput({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  className
}: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const selectRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<(HTMLDivElement | null)[]>([])

  const selectedOption = options.find((option: SelectOption) => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      })
    }
  }, [highlightedIndex, isOpen])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (isOpen && highlightedIndex >= 0) {
          onChange(options[highlightedIndex].value)
          setIsOpen(false)
        } else {
          setIsOpen(!isOpen)
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
      case 'ArrowDown':
        event.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setHighlightedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          )
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          )
        }
        break
    }
  }

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  const handleMouseEnter = (index: number) => {
    setHighlightedIndex(index)
  }

  return (
    <div 
      ref={selectRef}
      className={cn(
        'relative w-full',
        className
      )}
    >
      {/* Select Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          'w-full h-12 px-4 py-3 rounded-lg',
          'bg-(--bg-input) text-(--text-primary) border-(--border-primary)',
          'flex items-center justify-between',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-(--border-focus) focus:border-(--border-focus)',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          isOpen && 'ring-2 ring-(--border-focus) border-(--border-focus)'
        )}
      >
        <span className={cn(
          'text-left truncate',
        )}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={cn(
            'w-4 h-4 text-(--text-placeholder) transition-transform',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full bottom-full mb-1 bg-(--background-surface-higher) border border-(--border-primary) rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option: SelectOption, index: number) => (
            <div
              key={option.value}
              ref={el => { optionRefs.current[index] = el }}
              onClick={() => handleOptionClick(option.value)}
              onMouseEnter={() => handleMouseEnter(index)}
              className={cn(
                'px-4 py-3 cursor-pointer transition-colors text-sm text-(--text-secondary)',
                'hover:bg-(--bg-hover) focus:bg-(--bg-hover) focus:outline-none',
                'first:rounded-t-lg last:rounded-b-lg',
                highlightedIndex === index && 'bg-(--bg-hover)',
                value === option.value && 'bg-(--bg-hover) text-(--text-secondary) hover:bg-(--bg-hover)'
              )}
            >
              <div className="flex items-center justify-between">
                <span>{option.label}</span>
                {value === option.value && (
                  <div className="w-5 h-5 bg-(--accent-primary) rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
