import React, { ReactNode } from 'react';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Icon } from '@/components/Icons/Icon';

const headerLogo = cva(
  ['bg-gradient-primary', 'flex', 'items-center', 'justify-center', 'shadow-sm'],
  {
    variants: {
      variant: {
        rounded: ['rounded-full', 'h-16', 'w-16', 'mx-auto'],
        square: ['rounded-2xl', 'h-16', 'w-16', 'mx-auto'],
      },
    },
    defaultVariants: {
      variant: 'rounded',
    },
  }
);

export interface HeaderLogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerLogo> {
  icon:
    | 'ArrowRight'
    | 'Check'
    | 'Building'
    | 'Building2'
    | 'Briefcase'
    | 'User'
    | 'Lock'
    | 'Mail'
    | 'Shield'
    | 'ChevronDown'
    | 'Crown'
    | 'X'
    | 'Plus'
    | 'Trash2'
    | 'Clock'
    | 'Calendar'
    | 'ArrowLeft'
    | 'Phone'
    | 'Globe'
    | 'Users'
    | 'MapPin';
  className?: string;
  variant?: 'rounded' | 'square';
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({
  icon,
  children,
  className,
  variant,
  ...props
}) => (
  <div className={cn(headerLogo({ variant }), className)} {...props}>
    <Icon name={icon} size="30" color="white" variant="normal" /> {children}
  </div>
);
