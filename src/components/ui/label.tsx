import { LabelHTMLAttributes, memo, ReactNode, useMemo } from 'react';
import { cn } from '@/utils';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  className?: string;
}

export function Label({ children, htmlFor, className, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('text-sm font-medium leading-none text-[#344256] ', className)}
      {...props}
    >
      {children}
    </label>
  );
}
