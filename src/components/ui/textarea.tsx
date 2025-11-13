import { cn } from '@/utils';
import { TextareaHTMLAttributes, ReactNode, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { Icon, IconName } from '../Icons/Icon';
import { Description } from './Descriptions';
import { Label } from './Label';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Additional class names to apply to the textarea */
  className?: string;

  /** Optional icon to display inside the textarea */
  icon?: IconName;

  error?: FieldError;

  label?: string;

  id?: string;
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
  ({ className, icon, placeholder, label, id, error, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col justify-center items-start gap-2 w-full relative ')}>
        {label && <Label htmlFor={id}>{label}</Label>}
        <div className="relative w-full">
          {icon && (
            <span className="absolute left-1 top-4.5 text-gray-400 pointer-events-none">
              <Icon name={icon} />
            </span>
          )}
          <textarea
            ref={ref}
            rows={4}
            placeholder={placeholder}
            className={cn(
              'flex justify-center items-center border border-[#dfe2e799] rounded-md w-full transition-all duration-300 z-20 mt-1 pl-3 outline-none resize-none ',
              error
                ? 'border-destructive  ring-1 ring-offset-4 ring-destructive  '
                : 'focus-within:border-primary  ring-0 focus-within:ring-1 focus-within:ring-offset-4 focus-within:ring-primary ',
              icon && 'pl-9'
            )}
            {...props}
          />
          {error && (
            <Description className="text-destructive text-xs mt-1 absolute ">
              *{error.message}*
            </Description>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
