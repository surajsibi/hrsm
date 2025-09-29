import { cn } from '@/utils';
import { TextareaHTMLAttributes, ReactNode, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Additional class names to apply to the textarea */
  className?: string;

  /** Optional icon to display inside the textarea */
  icon?: ReactNode;
}

/**
 * TextArea component with optional icon.
 *
 * Wraps a <textarea> with custom styling, focus outline, and optional left icon.
 *
 * @example
 * ```tsx
 * <TextArea placeholder="Enter your message" />
 * <TextArea
 *   placeholder="Enter description"
 *   icon={<SomeIcon />}
 *   className="bg-gray-50"
 * />
 * ```
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, icon, placeholder, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <span className="absolute left-3 top-3 text-gray-400 pointer-events-none">{icon}</span>
        )}
        <textarea
          ref={ref}
          rows={4}
          placeholder={placeholder}
          className={cn(
            'w-full bg-[var(--input-bg)] text-gray-700 text-sm rounded-lg py-2 pl-10',
            'placeholder:text-gray-400 outline outline-offset-8 outline-transparent border border-gray-700/10',
            'focus:outline-2 focus:outline-offset-4 focus:outline-blue-500 focus:border focus:border-blue-500',
            'transition-colors resize-none',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
