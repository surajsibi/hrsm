import { cn } from '@/utils';
import { HTMLAttributes, memo } from 'react';

type LineBreakProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

/**
 * A simple horizontal divider.
 */
export function LineBreakMemo({ className, ...props }: LineBreakProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn('w-full h-px bg-gray-300', className)}
      {...props}
    />
  );
}

export const LineBreak = memo(LineBreakMemo);
