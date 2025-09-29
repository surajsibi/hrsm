import { cn } from '@/utils';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface DayProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content inside the button (e.g., "Monday") */
  children: ReactNode;

  /** Whether the day is active/selected */
  isActive?: boolean;

  /** Additional Tailwind or custom class names */
  className?: string;

  /** Click handler for the button */
  onClick?: () => void;
}

/**
 * `Day` is a styled button component representing a day of the week.
 * It supports active state styling, hover effects, and custom class overrides.
 *
 * @param {ReactNode} children - The button label (e.g., "Monday").
 * @param {boolean} [isActive=false] - Whether the button is active.
 * @param {string} [className] - Optional additional Tailwind or custom classes.
 * @param {() => void} [onClick] - Function called when the button is clicked.
 *
 * @example
 * // Basic usage
 * <Day>Monday</Day>
 *
 * @example
 * // Active state
 * <Day isActive>Tuesday</Day>
 *
 * @example
 * // Custom click handler and extra class
 * <Day isActive className="w-24" onClick={() => console.log("Clicked!")}>
 *   Wednesday
 * </Day>
 */
export function Day({ children, isActive = false, onClick, className }: DayProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'ring-offset-[#fcfcfc] font-[400] text-sm px-3 py-2 bg-[#fcfcfc] text-black border border-[#dfe2e7] rounded-md gap-2 flex items-center justify-center hover:text-[#3c83f6] hover:bg-[#bedbfe] cursor-pointer',
        { 'bg-[#3c83f6] hover:bg-[#3c83f6e6] text-white hover:text-white': isActive },
        className
      )}
    >
      {children}
    </button>
  );
}
