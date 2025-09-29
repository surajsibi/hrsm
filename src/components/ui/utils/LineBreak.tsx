import { cn } from '@/utils';
import { HTMLAttributes } from 'react';

type LineBreakProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

/**
 * A simple horizontal divider.
 */
export function LineBreak({ className, ...props }: LineBreakProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn('w-full h-px bg-gray-300', className)}
      {...props}
    />
  );
}
