import { type VariantProps, cva } from 'class-variance-authority';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Crown,
  Globe,
  Lock,
  type LucideProps,
  Mail,
  MapPin,
  Phone,
  Plus,
  Shield,
  Trash2,
  User,
  Users,
  X,
} from 'lucide-react';

import { cn } from '@/utils';

import type { JSX } from 'react/jsx-runtime';
/**
 * A map of available Lucide icons used in the app.
 * Extend this object to add more icons.
 */
const ICONS = {
  ArrowRight,
  Check,
  Building,
  Building2,
  Briefcase,
  User,
  Lock,
  Mail,
  Shield,
  ChevronDown,
  Crown,
  X,
  Plus,
  Trash2,
  Clock,
  Calendar,
  ArrowLeft,
  Phone,
  Globe,
  Users,
  MapPin,
} as const;

/**
 * Union type of all valid icon names.
 * Example: "Check"
 */
export type IconName = keyof typeof ICONS;

/**
 * Props for the Icon component.
 */
export interface IconProps extends LucideProps {
  /**
   * The name of the icon to render.
   * Must be one of the keys from the ICONS object.
   */
  name: IconName;

  /**
   * Variant for the icon.
   * Can be used to apply different styles to the icon.
   */
  variant?: VariantProps<typeof icon>['variant'];
}

/**
 * Icon component wrapper for Lucide icons.
 *
 * Provides type-safe access to a predefined set of icons and applies
 * consistent styling across the application.
 *
 * @example
 * ```tsx
 * // Default usage
 * <Icon name="Check" />
 *
 * // Custom size and color
 * <Icon name="Check" size={24} color="green" />
 *
 * // With absolute variant (e.g., inside an input field)
 * <Icon name="Check" varient="absolute" className="text-gray-500" />
 * ```
 */

const icon = cva('', {
  variants: {
    variant: {
      absolute: 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none',
      header: '',
    },
  },
  defaultVariants: {
    variant: 'absolute',
  },
});

export function Icon({
  name,
  variant,
  className,
  size = 16,
  color = '#7a8799',
  ...props
}: IconProps): JSX.Element | null {
  const Component = ICONS[name];

  if (!Component) return null;

  return (
    <Component
      data-testid={name}
      {...props}
      size={size}
      color={color}
      className={cn(icon({ variant }), className)}
    />
  );
}
