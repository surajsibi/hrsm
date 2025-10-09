import React, { memo } from 'react';
import { Title } from './Titles';
import { Description } from './Descriptions';
import { Icon } from '@/components/Icons/Icon';
import { Buttons } from './Buttons';

interface AddShiftProps {
  /** Title of the shift (e.g., "Day Shift") */
  title: string;
  /** Type of work (e.g., "WFH", "Onsite") */
  workType: string;
  /** Shift start time in 24h format (e.g., 9 for 9:00 AM) */
  startingTime: number;
  /** Shift end time in 24h format (e.g., 17 for 5:00 PM) */
  endingTime: number;
  /** Days on which the shift occurs */
  days?: string[];
  /** Action triggered when clicking "Add Shift" */
  handleAddShift?: () => void;
  /** Disable the "Add Shift" button */
  disabled?: boolean;
}

/** Format a number (24h) into 12h time with AM/PM */
function formatTime(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:00 ${period}`;
}

/**
 * AddShift renders a card displaying shift details:
 * - Title & work type
 * - Time range with duration
 * - List of days
 * - "Add Shift" button
 */
export const AddShift = memo(function AddShift({
  title,
  workType,
  startingTime,
  endingTime,
  days = ['Sunday', 'Monday'],
  handleAddShift,
  disabled,
}: AddShiftProps) {
  const hours = (endingTime - startingTime + 24) % 24;
  const timeRange = `${formatTime(startingTime)} - ${formatTime(endingTime)} (${hours}h)`;

  const daysText = days.join(', ');

  return (
    <div className="shadow-sm cursor-pointer border border-border bg-white rounded-lg hover:bg-bg-mute transition-all duration-300 w-full">
      <div className="p-4 flex flex-col justify-center gap-3">
        {/* Title and Work Type */}
        <div className="flex justify-between items-center">
          <Title variant="h3" className="text-md font-medium">
            {title}
          </Title>
          <div className="text-xs font-semibold text-heading py-0.5 px-2.5 rounded-full flex items-center justify-center border border-[#dfe2e7]">
            {workType}
          </div>
        </div>

        {/* Time and Days */}
        <div className="flex flex-col gap-1 justify-center">
          <Description className="flex items-center gap-3">
            <Icon name="Clock" size={16} /> {timeRange}
          </Description>
          <Description className="flex items-center gap-3">
            <Icon name="Calendar" size={16} /> Days: {daysText}
          </Description>
        </div>

        {/* Action Button */}
        <Buttons
          type="button"
          variant="default"
          size="sm"
          className="w-full "
          disabled={disabled}
          onClick={handleAddShift}
        >
          Add Shift
        </Buttons>
      </div>
    </div>
  );
});
