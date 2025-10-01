import { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { Label } from './Label';
import { Input } from './Input';
import { cn } from '@/utils';
import { Description } from './Descriptions';

import type { FieldError } from 'react-hook-form';

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional label text displayed above the input field.
   * When provided, it will be linked to the input via `id`.
   */
  label?: string;

  /**
   * Unique identifier for the input field.
   * Used for accessibility and linking with the label.
   */
  id?: string;

  /**
   * Optional icon element (e.g., an SVG or Icon component).
   * Rendered on the left side of the input inside the wrapper.
   */
  icon?: ReactNode;

  /**
   * Additional custom CSS classes for styling the input field.
   */
  className?: string;

  /**
   * Placeholder text displayed inside the input when empty.
   */
  placeholder?: string;

  /**
   * Optional error state indicator.
   */
  error?: FieldError;

  type?: string;

  value?: string;
}

/**
 * `InputComponent` is a reusable and test-friendly input wrapper component.
 *
 * ### Features:
 * - Renders an optional **label** linked with the input via `id`
 * - Supports an **optional icon**, which adjusts padding automatically (`pl-9`)
 * - Uses a styled `Input` component for consistency
 * - Provides `data-testid` attributes for easy unit/integration testing
 * - Fully extends native HTML `<input>` attributes
 *
 * ### Example Usage:
 * ```tsx
 * import { InputComponent } from "@/components/InputComponent";
 * import { Search } from "lucide-react";
 *
 * export default function Example() {
 *   return (
 *     <InputComponent
 *       id="username"
 *       label="Username"
 *       placeholder="Enter your username"
 *       icon={<Search />}
 *       onChange={(e) => console.log(e.target.value)}
 *     />
 *   );
 * }
 * ```
 */
export function InputComponent({
  label,
  placeholder,
  id,
  className,
  icon,
  error,
  value,
  type,
  ...props
}: InputComponentProps) {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full relative">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div
        className={cn(
          'flex justify-center items-center border border-[#dfe2e799]  relative rounded-md w-full transition-all duration-300 z-20 mt-1',
          error
            ? 'border-destructive  ring-1 ring-offset-4 ring-destructive'
            : 'focus-within:border-primary ring-0 focus-within:ring-1 focus-within:ring-offset-4 focus-within:ring-primary'
        )}
      >
        {icon && <span>{icon}</span>}
        <Input
          type={type}
          value={value}
          placeholder={placeholder}
          id={id}
          className={cn(icon ? 'pl-9' : '', className)}
          {...props}
        />
      </div>
      {error && (
        <Description className="text-destructive text-xs mt-1 absolute top-[100%]">
          *{error.message}*
        </Description>
      )}
    </div>
  );
}
