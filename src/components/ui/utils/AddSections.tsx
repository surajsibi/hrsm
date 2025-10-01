import React, { memo } from 'react';
import { Description } from './Descriptions';
import { Title } from './Titles';
import { Icon } from '@/components/Icons/Icon';

interface AddedSectionProps {
  /**
   * Title text displayed next to the icon.
   * Defaults to `"Quality Assurance"`.
   */
  title?: string;

  /**
   * Description text shown below the title.
   * Defaults to `"Status: ACTIVE"`.
   */
  description?: string;

  /**
   * Custom icon element to display (e.g., SVG or `Icon` component).
   * Defaults to a blue `"Briefcase"` icon.
   */
  icon?: React.ReactNode;

  /**
   * Optional callback triggered when the delete (`Trash2`) button is clicked.
   */
  onDelete?: () => void;

  /**
   * Optional test id for testing libraries (React Testing Library, Jest, Cypress, etc.)
   */
}

/**
 * `AddedSection` is a reusable UI component that displays:
 * - An **icon** (customizable, defaults to `Briefcase`).
 * - A **title** and **description**.
 * - A **delete button** (`Trash2` icon) that triggers the `onDelete` handler if provided.
 *
 * This component is memoized with `React.memo` to avoid unnecessary re-renders
 * when used in lists or multiple places with stable props.
 *
 * @component
 * @example
 * // Default usage with fallback values
 * <AddedSection />
 *
 * @example
 * // Custom usage with props
 * <AddedSection
 *   title="Frontend Developer"
 *   description="Status: Pending"
 *   icon={<Icon name="User" color="green" size={16} />}
 *   onDelete={() => console.log("Deleted!")}
 *   data-testid="added-section"
 * />
 */
export const AddedSection = memo(function AddedSection({
  title = 'Quality Assurance',
  description = 'Status: ACTIVE',
  icon = <Icon name="Briefcase" color="#3c83f6" size={16} />,
  onDelete,
}: AddedSectionProps) {
  return (
    <div className="p-3 bg-[#f0f2f44d]  border border-[#dfe2e74d] rounded-lg flex justify-between items-center ">
      <div className="flex gap-3 items-center">
        <div className="flex py-1 px-1 rounded-full items-center justify-center bg-[#3c83f61a]">
          {icon}
        </div>
        <div className="flex flex-col items-start">
          <Title className="text-[16px] font-medium">{title}</Title>
          <Description className="text-sm">{description}</Description>
        </div>
      </div>

      <button onClick={onDelete} aria-label="Delete section">
        <Icon name="Trash2" color="#dc2828" size={16} />
      </button>
    </div>
  );
});
