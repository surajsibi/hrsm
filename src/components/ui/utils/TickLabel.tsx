import React, { ReactNode, useState } from 'react';
import { Icon } from '@/components/Icons/Icon';
import { Title } from './Titles';
import { cn } from '@/utils';

interface TickLabelProps {
  /**
   * The label text or elements displayed next to the tick.
   * Can be a string or any valid ReactNode.
   */
  children: ReactNode;
}

/**
 * `TickLabel` is a toggleable label component with a circular check indicator.
 *
 * - Displays a round "tick" indicator that toggles on/off when clicked.
 * - Uses the `Icon` component to render a check mark when active.
 * - Wraps label text inside the `Title` component for consistent typography.
 *
 * @component
 * @example
 * // Basic usage
 * <TickLabel>Option 1</TickLabel>
 *
 * @example
 * // With custom content
 * <TickLabel>
 *   <span className="text-blue-500">Custom Label</span>
 * </TickLabel>
 */
export function TickLabel({ children }: TickLabelProps) {
  /**
   * Tracks whether the tick is checked or not.
   * @default false
   */
  const [checked, setChecked] = useState(false);

  return (
    <button onClick={() => setChecked(!checked)} className="flex gap-2 items-center justify-center">
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
