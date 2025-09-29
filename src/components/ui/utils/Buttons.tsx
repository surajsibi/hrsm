import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { Spinner } from './Spinner';

const button = cva(
  [
    'py-2',
    'px-4',
    'w-full',
    'font-medium',
    'transition-all',
    'duration-300',
    'items-center',
    'flex',
    'justify-center',
    'rounded-lg',
    'cursor-pointer',
    'gap-2',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-primary',
          'text-white',
          'shadow-md',
          'hover:shadow-lg',
          'hover:bg-gradient-primary-hover',
          'focus:outline-blue-600',
        ],
        secondary: [
          'bg-transparent',
          'text-[#7a8799]',
          'border',
          'border-[#dfe2e7]',
          'hover:text-[#3c83f6]',
          'hover:bg-[#bedbfe]',
          'hover:border-transparent',
        ],
        ghost: ['bg-transparent', 'text-[#7a8799]',"border-none", 'hover:text-[#344256]', 'hover:bg-[#bedbfe]'],
        default: [
          'bg-transparent',
          'text-[#344256]',
          'border',
          'border-[#dfe2e7]',
          'hover:text-blue-500',
          'hover:bg-[#bedbfe]',
          'hover:border-transparent',
          'gap-2',
        ],
      },
      size: {
        sm: ['text-sm', 'py-1', 'px-2', 'min-h-9', 'min-w-15'],
        md: ['text-base', 'py-2', 'px-4', 'h-9', 'w-24'],
        lg: ['text-lg', 'py-3', 'px-6', 'h-11', 'w-32'],
      },
      disabled: {
        false: null,
        true: ['opacity-50', 'cursor-not-allowed'],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
      disabled: false,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof button> {
  loadingChildren?: ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

export const Buttons: React.FC<ButtonProps> = ({
  className,
  loadingChildren,
  variant,
  loading,
  size,
  disabled,
  onClick,
  ...props
}) => (
  <button
    onClick={onClick}
    className={cn(button({ variant, size, disabled }), className)}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? (
      loadingChildren ? (
        <span>{loadingChildren}</span>
      ) : (
        <Spinner />
      )
    ) : (
      <span>{props.children}</span>
    )}
  </button>
);
