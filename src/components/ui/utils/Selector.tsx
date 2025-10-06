'use client';
import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  memo,
  useCallback,
  HTMLAttributes,
  HTMLInputTypeAttribute,
} from 'react';
import { cn } from '@/utils';
import { Icon } from '@/components/Icons/Icon';
import { Label } from '@/components/ui/utils/Label';
import { FieldError } from 'react-hook-form';
import { Description } from '@/components/ui/utils/Descriptions';

/**
 * Props for the `Selector` component.
 */
interface SelectorProps {
  /** Optional custom content to render inside the button before the selected value. */
  children?: ReactNode;

  /** Optional additional Tailwind or custom classes. */
  className?: string;

  /** Placeholder text when no value is selected. Defaults to `"Select..."`. */
  placeholder?: string;

  /** List of selectable options. Defaults to `["option1","option2","option3"]`. */
  options?: string[];

  /** Optional ID for accessibility linking the button to the listbox. */
  id?: string;

  /** Current selected value. */
  value?: string;

  /** Callback function called when an option is selected. Receives the selected value as a parameter. */
  onChange?: (value: string) => void;

  /** Disable the selector button. */
  disabled?: boolean;

  // Optional label text displayed above the selector. */
  label?: string;

  // Optional icon element (e.g., an SVG or Icon component).
  icon?: ReactNode;

  error?: FieldError;
}

/**
 * `Selector` is a reusable dropdown component with support for:
 * - Mouse click selection
 * - Keyboard navigation (ArrowUp, ArrowDown, Enter, Escape)
 * - Accessibility with ARIA roles and attributes
 * - Memoized rendering for performance
 *
 * @component
 * @example
 * // Basic usage
 * <Selector
 *   placeholder="Choose an option"
 *   options={["Apple", "Banana", "Orange"]}
 *   value={selectedValue}
 *   onChange={(val) => setSelectedValue(val)}
 * />
 *
 * @example
 * // With custom children
 * <Selector
 *   placeholder="Select a fruit"
 *   options={["Apple", "Banana", "Orange"]}
 * >
 *   <span>🍎</span>
 * </Selector>
 */
export const Selector = memo(function Selector({
  children,
  className,
  placeholder = 'Select...',
  options = ['option1', 'option2', 'option3'],
  id,
  value,
  label,
  icon,
  onChange,
  error,
  disabled,
}: SelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selected = value || placeholder;

  /** Close dropdown if clicked outside */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /** Handle keyboard navigation for accessibility */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'Enter') {
          setIsOpen(true);
          setHighlightedIndex(0);
          e.preventDefault();
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        setHighlightedIndex(prev => (prev + 1) % options.length);
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        setHighlightedIndex(prev => (prev - 1 + options.length) % options.length);
        e.preventDefault();
      } else if (e.key === 'Enter') {
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          onChange?.(options[highlightedIndex]);
          setIsOpen(false);
        }
        e.preventDefault();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setHighlightedIndex(-1);
        e.preventDefault();
      }
    },
    [highlightedIndex, isOpen, options, onChange]
  );

  return (
    <div className={cn('w-full flex flex-col relative gap-2 ', className)}>
      {label && (
        <Label className="" htmlFor={id}>
          {label}
        </Label>
      )}
      <button
        ref={buttonRef}
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center justify-between text-sm text-black px-3 py-2 w-full rounded-md border border-gray-300',
          'focus:border-blue-500 focus:outline-2 focus:outline-offset-4 focus:outline-blue-500',
          'disabled:opacity-50 disabled:cursor-not-allowed mt-1 h-11 relative'
        )}
      >
        <div
          className={cn(
            'flex items-center  gap-2 w-full text-left font-medium text-sm text-gray-900  ',
            {
              'pl-4': icon,
            }
          )}
        >
          {icon && <span>{icon}</span>}
          {children}
          <p>{selected}</p>
        </div>
        <Icon name="ChevronDown" />
      </button>

      <div
        ref={dropdownRef}
        role="listbox"
        id={`${id}-listbox`}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          'absolute top-full mt-2 flex flex-col w-full shadow-custom bg-white rounded-lg border border-gray-300 overflow-hidden transition-all duration-300 z-50 ',
          isOpen ? 'max-h-96 p-1 opacity-100 ' : 'max-h-0 p-0 opacity-0 pointer-events-none'
        )}
      >
        {options.map((item, index) => (
          <button
            key={item}
            role="option"
            aria-selected={item === value}
            type="button"
            onClick={() => {
              onChange?.(item);
              setIsOpen(false);
            }}
            className={cn(
              'text-sm text-black px-6 py-2 w-full text-left rounded-sm hover:bg-blue-100 hover:text-blue-500',
              highlightedIndex === index && 'bg-blue-100 text-blue-600'
            )}
          >
            {item}
          </button>
        ))}
      </div>
      {error && (
        <Description className="text-destructive text-xs mt-1 absolute top-[100%]">
          *{error.message}*
        </Description>
      )}
    </div>
  );
});
