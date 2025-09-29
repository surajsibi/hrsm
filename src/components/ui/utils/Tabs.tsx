import { cn } from '@/utils';
import { ReactNode } from 'react';
import { Icon } from '@/components/Icons/Icon';

interface TabProps {
  /** Label of the tab */
  children: string;

  /** Whether the tab is active */
  active?: boolean;

  /** Click handler */
  onClick?: () => void;

  /** Optional icon when active */
  activeIcon?: ReactNode;

  /** Optional icon when inactive */
  inactiveIcon?: ReactNode;
}

/**
 * Tab component with toggleable icon based on active state.
 *
 * @example
 * <Tab active onClick={() => console.log("Clicked!")}>Add Item</Tab>
 * <Tab>New Tab</Tab>
 */
export function Tab({
  children,
  active,
  onClick,
  activeIcon = <Icon name="X" size={16} />,
  inactiveIcon = <Icon name="Plus" size={16} />,
}: TabProps) {
  const baseClasses =
    'text-[#344256] text-sm flex font-medium items-center justify-center gap-2 py-2 px-3 border border-gray-700/20 rounded-md transition-colors duration-300 bg-[#fcfcfc] h-9';
  const activeClasses = 'opacity-50 pointer-events-none border-0 text-gray-500';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(baseClasses, active && activeClasses)}
    >
      {active ? activeIcon : inactiveIcon}
      <p>{children}</p>
    </button>
  );
}
