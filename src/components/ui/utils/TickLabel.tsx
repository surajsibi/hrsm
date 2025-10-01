import React, { ReactNode } from 'react';
import { Icon } from '@/components/Icons/Icon';
import { Title } from './Titles';
import { cn } from '@/utils';

interface TickLabelProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  children: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function TickLabel({ children, className, checked, onChange, ...props }: TickLabelProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn('flex gap-2 items-center justify-center', className)}
      {...props}
    >
      <div
        className={cn(
          'w-4 h-4 cursor-pointer rounded-full border border-primary flex items-center justify-center',
          checked && 'bg-primary'
        )}
      >
        {checked && <Icon name="Check" size={16} color="white" />}
      </div>
      <Title className="text-sm font-medium text-center">{children}</Title>
    </button>
  );
}
