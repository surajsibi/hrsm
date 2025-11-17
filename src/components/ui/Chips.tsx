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

  onChange?: (active: boolean) => void;
  value?: string;
}

const BASE_CLASSES =
  'text-[#344256] text-sm flex font-medium items-center justify-center gap-2 py-2 px-3 border border-gray-700/20 rounded-md hover:bg-(--gradient-primary) hover:text-white transition-colors duration-300 bg-[#fcfcfc] h-9';
const ACTIVE_CLASSES = 'opacity-50 bg-[#edeff2] pointer-events-none border-0 text-gray-500';

/**
 * Tab component with toggleable icon based on active state.
 *
 * @example
 * <Tab active onClick={() => console.log("Clicked!")}>Add Item</Tab>
 * <Tab>New Tab</Tab>
 */
export function Chip({
  children,
  active = false,
  onClick,
  activeIcon = <Icon name="X" size={16} variant="normal" />,
  inactiveIcon = <Icon name="Plus" size={16} variant="normal" color='#367df6' />,
}: TabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(BASE_CLASSES, active && ACTIVE_CLASSES)}
    >
      {active ? activeIcon : inactiveIcon}
      <p>{children}</p>
    </button>
  );
}

interface IOption {
  label: string;
  value: string;
}
export interface ITabs {
  options: IOption[];
  values?: string[];
  onChange?: (value: string[]) => void;
}

export function Chips({ options, values = [], onChange = () => null }: ITabs) {
  const handleTabClick = (optionValue: string) => () => {
    if (values.includes(optionValue)) {
      // If already selected, remove it from the array
      onChange(values.filter(value => value !== optionValue));
    } else {
      // If not selected, add it to the array
      onChange([...values, optionValue]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2 space-y-2">
      {options.map(option => (
        <Chip
          key={option.value}
          active={values.includes(option.value)}
          onClick={handleTabClick(option.value)}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  );
}
