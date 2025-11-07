'use client';

import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  ReactNode,
  MouseEvent,
  forwardRef,
  MouseEventHandler,
  ComponentProps,
  ButtonHTMLAttributes,
} from 'react';
import { Spinner } from './Spinner';
import { useRouter } from 'next/navigation';
import { Icon, IconName } from '@/components/Icons/Icon';
import Link from 'next/link';
import { ref } from 'process';

const buttonVariants = cva(
  [
    'flex items-center justify-center gap-2 rounded-lg font-medium cursor-pointer transition-all duration-300 px-4 py-2 w-full',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-primary text-white shadow-md hover:shadow-lg hover:bg-gradient-primary-hover focus:outline-blue-600',
        secondary:
          'bg-transparent text-[#7a8799] border border-[#dfe2e7] hover:text-[#3c83f6] hover:bg-[#bedbfe] hover:border-transparent',
        ghost: 'bg-transparent text-[#7a8799] hover:text-[#344256] hover:bg-[#bedbfe] border-none',
        default:
          'bg-transparent text-[#344256] border border-[#dfe2e7] hover:text-blue-500 hover:bg-[#bedbfe] hover:border-transparent',
      },
      size: {
        sm: 'text-sm py-1 px-2 min-h-9 min-w-15',
        md: 'text-base py-2 px-4 h-9 w-24',
        lg: 'text-lg py-3 px-6 h-11 w-32',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
      disabled: false,
    },
  }
);

interface ContentWithLoadingProps {
  loading?: boolean;
  loadingChildren?: ReactNode;
  startIcon?: IconName;
  endIcon?: IconName;
  iconColor?: string;
  children?: ReactNode;
}

function ContentWithLoading({
  loading,
  loadingChildren,
  startIcon,
  endIcon,
  iconColor,
  children,
}: ContentWithLoadingProps) {
  return (
    <>
      {loading ? (
        loadingChildren ? (
          <span>{loadingChildren}</span>
        ) : (
          <Spinner />
        )
      ) : (
        <>
          {startIcon && <Icon name={startIcon} size={16} color={iconColor} />}
          <span>{children}</span>
          {endIcon && <Icon name={endIcon} size={16} color={iconColor} />}
        </>
      )}
    </>
  );
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  loadingChildren?: ReactNode;
  startIcon?: IconName;
  endIcon?: IconName;
  iconColor?: string;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      disabled,
      loading,
      loadingChildren,
      startIcon,
      endIcon,
      children,
      iconColor,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, disabled: isDisabled }), className)}
        {...props}
      >
        <ContentWithLoading
          loading={loading}
          loadingChildren={loadingChildren}
          startIcon={startIcon}
          endIcon={endIcon}
          iconColor={iconColor}
        >
          {children}
        </ContentWithLoading>
      </button>
    );
  }
);

Button.displayName = 'Button';

type SharedButtonProps = Pick<
  ButtonProps,
  | 'variant'
  | 'size'
  | 'startIcon'
  | 'endIcon'
  | 'loading'
  | 'className'
  | 'children'
  | 'loadingChildren'
  | 'iconColor'
>;

/**
 * Shared props for ButtonLink component.
 */
type NextLinkBaseProps = Omit<
  ComponentProps<typeof Link>,
  'onClick' | 'children' | 'href' | 'className'
> & {
  href: ComponentProps<typeof Link>['href'];
};

type ButtonLinkProps = SharedButtonProps & NextLinkBaseProps;

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      className,
      variant,
      size,
      loading,
      loadingChildren,
      href,
      startIcon,
      endIcon,
      children,
      iconColor,
      ...linkProps
    },
    ref
  ) => {
    const isDisabled = loading;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          buttonVariants({ variant, size }),
          'relative',
          className,
          isDisabled && 'pointer-events-none opacity-50'
        )}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : undefined}
        {...linkProps}
      >
        <ContentWithLoading
          loading={loading}
          loadingChildren={loadingChildren}
          startIcon={startIcon}
          endIcon={endIcon}
          iconColor={iconColor}
        >
          {children}
        </ContentWithLoading>
      </Link>
    );
  }
);

ButtonLink.displayName = 'Button.Link';

const CompoundButton = Button as typeof Button & { Link: typeof ButtonLink };

CompoundButton.Link = ButtonLink;

export { CompoundButton as Button, buttonVariants };
