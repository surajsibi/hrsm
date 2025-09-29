import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const description = cva(['text-paragraph', 'text-center'], {
  variants: {
    size: {
      sm: ['text-sm'],
      md: ['text-base'],
      lg: ['text-lg'],
      xl: ['text-xl'],
      xxl: ['text-2xl'],
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export interface DescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof description> {
  className?: string;
}

export const Description: React.FC<DescriptionProps> = ({ className, size, ...props }) => (
  <p className={cn(description({ size }), className)} {...props} />
);
