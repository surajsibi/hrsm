import { type JSX, useEffect, useMemo, useState } from 'react';

import { useFieldArray, useForm } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { AddedSection } from '@/components/ui/utils/AddSections';
import { AddShift } from '@/components/ui/utils/AddShift';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Description } from '@/components/ui/utils/Descriptions';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { Label } from '@/components/ui/utils/Label';
import { LineBreak } from '@/components/ui/utils/LineBreak';
import { Note } from '@/components/ui/utils/Note';
import { Selector } from '@/components/ui/utils/Selector';
import { TickLabel } from '@/components/ui/utils/TickLabel';
import { Title } from '@/components/ui/utils/Titles';
import { cn } from '@/utils';

import type { IShiftList, ShiftType } from '@/types/form-types';

export default function Shifts({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}): JSX.Element {
  const workTypes = useMemo(() => ['Work From Home', 'Work From Office', 'Hybrid Work'], []);
  const weekDays = useMemo(
    () => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    []
  );

  const [currentShift, setCurrentShift] = useState<ShiftType>({
    title: '',
    workType: 'Work From Office',
    startingTime: '09:00',
    endingTime: '18:00',
    days: ['Monday'],
    workingHours: '9',
    shiftTracking: false,
    rotationalShifts: false,
  });

  const ShiftTemplates = useMemo(
    () => [
      {
        title: 'Day Shift',
        workType: 'Work From Office',
        startingTime: '09:00',
        endingTime: '18:00',
        days: ['Monday'],
      },
      {
        title: 'Night Shift',
        workType: 'Work From Office',
        startingTime: '22:00',
        endingTime: '06:00',
        days: ['Monday'],
      },
      {
        title: 'Remote Shift',
        workType: 'Work From Home',
        startingTime: '10:00',
        endingTime: '19:00',
        days: ['Monday'],
      },
      {
        title: 'Flexible Hours',
        workType: 'Hybrid Work',
        startingTime: '08:00',
        endingTime: '17:00',
        days: ['Monday'],
      },
    ],
    []
  );

  const { control, handleSubmit } = useForm<IShiftList>({
    defaultValues: {
      ShiftList: [],
    },
  });

  const {
    fields: shifts,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'ShiftList',
  });

  function onSubmit(data: IShiftList) {
    console.log(data);
    onNext();
  }

  const handleAddShift = () => {
    append({
      ...currentShift,
      workingHours: currentShift.workingHours, // already calculated
    });

    // Optional: reset currentShift form
    setCurrentShift({
      title: '',
      workType: 'Work From Office',
      startingTime: '09:00',
      endingTime: '18:00',
      days: ['Monday'],
      workingHours: '9',
      shiftTracking: false,
      rotationalShifts: false,
    });
  };

  // Function to calculate working hours
  const calculateWorkHours = (start: string, end: string) => {
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);

    const startMinutes = startH * 60 + startM;
    let endMinutes = endH * 60 + endM;

    // If end is smaller than start, assume overnight shift
    if (endMinutes <= startMinutes) endMinutes += 24 * 60;

    return (endMinutes - startMinutes) / 60;
  };

  // Update working hours whenever start or end time changes
  useEffect(() => {
    const hours = calculateWorkHours(currentShift.startingTime, currentShift.endingTime);

    setCurrentShift(prev => ({ ...prev, workingHours: hours.toString() }));
  }, [currentShift.startingTime, currentShift.endingTime]);

  const handleDayClick = (day: string) => {
    setCurrentShift(prev => {
      const days = prev.days.includes(day)
        ? prev.days.filter(d => d !== day) // remove if already selected
        : [...prev.days, day]; // add if not selected

      return { ...prev, days };
    });
  };

  return (
    <form className="flex flex-col p-6 pt-8 gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1 items-start">
        <Title variant="h3">Shifts</Title>
        <Description>Configure work schedules</Description>
      </div>

      {/* Quick Add Templates */}
      <div className="flex flex-col gap-1 items-start">
        <Title className="text-md font-medium" variant="h3">
          Quick Add Shift Templates
        </Title>
        <Description>Click on common shifts patterns to add them quickly</Description>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        {ShiftTemplates.map(shift => (
          <AddShift
            key={shift.title}
            title={shift.title}
            workType={shift.workType}
            startingTime={Number.parseInt(shift.startingTime.split(':')[0], 10)}
            endingTime={Number.parseInt(shift.endingTime.split(':')[0], 10)}
            days={shift.days}
            disabled={shifts.some(s => s.title === shift.title)}
            handleAddShift={() =>
              append({
                ...shift,
                workingHours: calculateWorkHours(shift.startingTime, shift.endingTime).toString(),
                shiftTracking: false,
                rotationalShifts: false,
              })
            }
          />
        ))}
      </div>

      {/* Custom Shift */}
      <Title variant="h3" className="font-medium text-start">
        Create Custom Shift
      </Title>

      {/* name, work type */}
      <div className="flex gap-4 w-full">
        <InputComponent
          parentClassName="w-1/2"
          label="Shift Name *"
          id="shiftName"
          placeholder="Enter shift name"
          value={currentShift.title}
          onChange={e => setCurrentShift({ ...currentShift, title: e.target.value })}
          icon={
            <Icon
              name="Clock"
              size={16}
              color="#7a8799"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
          }
        />

        <Selector
          className="w-1/2"
          onChange={val => setCurrentShift({ ...currentShift, workType: val })}
          value={currentShift.workType}
          options={workTypes}
          id="workType"
          label="Work Type *"
        />
      </div>

      {/* times + hours */}
      <div className="flex gap-4 w-full">
        <InputComponent
          parentClassName="w-1/3"
          id="checkInTime"
          label="Check-in Time *"
          type="time"
          value={currentShift.startingTime}
          onChange={e => setCurrentShift({ ...currentShift, startingTime: e.target.value })}
        />

        <InputComponent
          parentClassName="w-1/3"
          label="Check-out Time *"
          id="checkOutTime"
          type="time"
          value={currentShift.endingTime}
          onChange={e => setCurrentShift({ ...currentShift, endingTime: e.target.value })}
        />

        <InputComponent
          parentClassName="w-1/3"
          label="Working Hours"
          id="workingHours"
          type="test"
          value={currentShift.workingHours}
          readOnly
        />
      </div>

      {/* Days */}
      <div className="flex flex-col gap-1 items-start">
        <Label className="mb-2">Weekend Days</Label>
        <div className="flex gap-2 flex-wrap">
          {weekDays.map(day => (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              type="button"
              className={cn(
                'ring-offset-[#fcfcfc] font-[400] text-sm px-3 py-2 bg-[#fcfcfc] text-black border border-[#dfe2e7] rounded-md gap-2 flex items-center justify-center hover:text-[#3c83f6] hover:bg-[#bedbfe] cursor-pointer transition-all duration-300',
                {
                  'bg-[#3c83f6] hover:bg-[#3c83f6e6] text-white hover:text-white':
                    currentShift.days?.includes(day) ?? false,
                }
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* flags */}
      <div className="flex flex-col justify-center gap-3 items-start">
        <TickLabel
          checked={currentShift.shiftTracking}
          onChange={() =>
            setCurrentShift(prev => ({ ...prev, shiftTracking: !prev.shiftTracking }))
          }
        >
          Enable shift tracking
        </TickLabel>

        <TickLabel
          checked={currentShift.rotationalShifts}
          onChange={() =>
            setCurrentShift(prev => ({ ...prev, rotationalShifts: !prev.rotationalShifts }))
          }
        >
          Rotational shift
        </TickLabel>
      </div>

      <Buttons
        data-testid="add-shift"
        type="button"
        disabled={
          currentShift.workingHours === '0' ||
          !currentShift?.days?.length ||
          !currentShift.title ||
          !currentShift.workType ||
          !currentShift.startingTime ||
          !currentShift.endingTime
        }
        onClick={handleAddShift}
        className="w-fit"
        variant="primary"
        size="md"
      >
        <div className="flex gap-2 items-center justify-center">
          <Icon name="ArrowLeft" size={16} />
          Add Shift
        </div>
      </Buttons>

      {/* Added shifts list */}
      {shifts.length > 0 && (
        <div>
          <Title variant="h3" className="font-medium text-start">
            Added Shifts
          </Title>
          <div className="shadow-md space-y-4 bg-white border border-border rounded-lg p-4 text-primary">
            {shifts.map((shift, index) => (
              <AddedSection
                key={shift.id}
                title={shift.title}
                description={`${shift.workType} • ${shift.startingTime} - ${shift.endingTime} • ${shift.workingHours}h`}
                icon={<Icon name="Crown" size={16} />}
                onDelete={() => remove(index)}
              />
            ))}
          </div>
        </div>
      )}

      <Note>
        Shifts define working schedules and attendance policies. You can create multiple shifts for
        different teams or departments.
      </Note>

      <LineBreak />

      {/* Footer actions */}
      <div className="w-full flex justify-between gap-4 items-center">
        <Buttons
          type="button"
          variant="secondary"
          onClick={onNext}
          size="sm"
          className="w-1/2 font-medium text-black"
        >
          Skip This Step
        </Buttons>
        <Buttons type="submit" variant="primary" size="sm" className="w-1/2 font-medium ">
          <div className="flex items-center justify-center gap-3 font-medium ">
            Continue <Icon name="ArrowRight" size={16} />
          </div>
        </Buttons>
      </div>

      <LineBreak />

      <div className="flex justify-start items-center gap-4 w-fit px-2">
        <Buttons
          type="button"
          onClick={onPrev}
          variant="secondary"
          size="sm"
          className="text-black font-medium "
        >
          <div className="flex items-center justify-center gap-3 font-medium">
            <Icon name="ArrowLeft" size={16} />
            <span className="font-medium text-center">Previous Step</span>
          </div>
        </Buttons>
      </div>
    </form>
  );
}
