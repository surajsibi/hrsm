import { useEffect, useMemo } from 'react';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { AddedSection } from '@/components/ui/utils/AddSections';
import { AddShift } from '@/components/ui/utils/AddShift';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Day } from '@/components/ui/utils/Day';
import { Description } from '@/components/ui/utils/Descriptions';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { Label } from '@/components/ui/utils/Label';
import { LineBreak } from '@/components/ui/utils/LineBreak';
import { Note } from '@/components/ui/utils/Note';
import { Selector } from '@/components/ui/utils/Selector';
import { TickLabel } from '@/components/ui/utils/TickLabel';
import { Title } from '@/components/ui/utils/Titles';

import type { FormType } from '@/types/form-types';
// eslint-disable-next-line no-duplicate-imports
import type { JSX } from 'react';

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

  const { control, watch, setValue } = useFormContext<FormType>();

  // For managing dynamic shifts list
  const {
    fields: shifts,
    append,
    remove,
  } = useFieldArray<FormType, 'ShiftList'>({
    name: 'ShiftList',
    control,
  });

  const shiftValues = watch('Shift');

  // Calculate work hours
  const calculateWorkHours = (start: string, end: string) => {
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);

    const startMinutes = startH * 60 + startM;
    let endMinutes = endH * 60 + endM;

    if (endMinutes <= startMinutes) endMinutes += 24 * 60;

    return (endMinutes - startMinutes) / 60;
  };

  useEffect(() => {
    if (shiftValues.startingTime && shiftValues.endingTime) {
      const hours = calculateWorkHours(shiftValues.startingTime, shiftValues.endingTime);

      setValue('Shift.workingHours', hours);
    }
  }, [shiftValues.startingTime, shiftValues.endingTime, setValue]);

  const handleDayClick = (day: string) => {
    const days = shiftValues.days ?? [];
    const updatedDays = days.includes(day) ? days.filter(d => d !== day) : [...days, day];

    setValue('Shift.days', updatedDays);
  };

  const handleAddShift = () => {
    append({ ...shiftValues });
    setValue('Shift', {
      title: '',
      workType: 'Work From Office',
      startingTime: '09:00',
      endingTime: '18:00',
      days: ['Monday'],
      workingHours: 9,
      shiftTracking: false,
      rotationalShifts: false,
    });
  };

  // Shift templates
  const ShiftTemplates = useMemo(
    () => [
      {
        title: 'Day Shift',
        workType: 'Work From Office',
        startingTime: 9,
        endingTime: 18,
        days: ['Monday'],
      },
      {
        title: 'Night Shift',
        workType: 'Work From Office',
        startingTime: 22,
        endingTime: 6,
        days: ['Monday'],
      },
      {
        title: 'Remote Shift',
        workType: 'Work From Home',
        startingTime: 10,
        endingTime: 19,
        days: ['Monday'],
      },
      {
        title: 'Flexible Hours',
        workType: 'Hybrid Work',
        startingTime: 8,
        endingTime: 17,
        days: ['Monday'],
      },
    ],
    []
  );

  return (
    <div className="flex flex-col p-6 pt-8 gap-6">
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
            {...shift}
            handleAddShift={() =>
              append({
                title: shift.title,
                workType: shift.workType,
                startingTime: `${shift.startingTime.toString().padStart(2, '0')}:00`,
                endingTime: `${shift.endingTime.toString().padStart(2, '0')}:00`,
                days: shift.days,
                workingHours: (shift.endingTime - shift.startingTime + 24) % 24 || 0,
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

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 w-full">
          <div className="w-1/2">
            <Controller
              name="Shift.title"
              control={control}
              render={({ field }) => (
                <InputComponent
                  label="Shift Name *"
                  placeholder="Enter shift name"
                  {...field}
                  icon={
                    <Icon
                      name="Clock"
                      size={16}
                      color="#7a8799"
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                    />
                  }
                />
              )}
            />
          </div>
          <div className="w-1/2">
            <Controller
              name="Shift.workType"
              control={control}
              render={({ field }) => (
                <Selector options={workTypes} id="workType" label="Work Type *" {...field} />
              )}
            />
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="w-1/3">
            <Controller
              name="Shift.startingTime"
              control={control}
              render={({ field }) => (
                <InputComponent
                  label="Check-in Time *"
                  type="time"
                  {...field}
                  icon={
                    <Icon
                      name="Clock"
                      size={16}
                      color="#7a8799"
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                    />
                  }
                />
              )}
            />
          </div>
          <div className="w-1/3">
            <Controller
              name="Shift.endingTime"
              control={control}
              render={({ field }) => (
                <InputComponent
                  label="Check-out Time *"
                  type="time"
                  {...field}
                  icon={
                    <Icon
                      name="Clock"
                      size={16}
                      color="#7a8799"
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                    />
                  }
                />
              )}
            />
          </div>
          <div className="w-1/3">
            <Controller
              name="Shift.workingHours"
              control={control}
              render={({ field }) => (
                <InputComponent
                  label="Working Hours"
                  type="number"
                  value={field.value.toString()}
                  readOnly
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-start">
        <Label className="mb-2">Weekend Days</Label>
        <div className="flex gap-2 flex-wrap">
          {weekDays.map(day => (
            <Day
              key={day}
              onClick={() => handleDayClick(day)}
              isActive={shiftValues.days.includes(day)}
            >
              {day}
            </Day>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-3">
        <Controller
          name="Shift.shiftTracking"
          control={control}
          render={({ field }) => (
            <TickLabel checked={field.value} onChange={field.onChange} className="justify-start">
              Enable shift tracking
            </TickLabel>
          )}
        />
        <Controller
          name="Shift.rotationalShifts"
          control={control}
          render={({ field }) => (
            <TickLabel checked={field.value} onChange={field.onChange} className="justify-start">
              Rotational shift
            </TickLabel>
          )}
        />
      </div>

      <Buttons
        disabled={
          shiftValues.workingHours === 0 ||
          !shiftValues?.days?.length ||
          !shiftValues.title ||
          !shiftValues.workType ||
          !shiftValues.startingTime ||
          !shiftValues.endingTime
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
        &nbsp; Shifts define working schedules and attendance policies. You can create multiple
        shifts for different teams or departments. Rotational shifts automatically cycle through
        different patterns.
      </Note>
      <LineBreak />
      <div className="w-full flex justify-between gap-4 items-center">
        <Buttons
          type="button"
          variant="secondary"
          size="sm"
          className="w-1/2 font-medium text-black"
        >
          Skip This Step
        </Buttons>
        <Buttons
          type="button"
          onClick={onNext}
          variant="primary"
          size="sm"
          className="w-1/2 font-medium "
        >
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
    </div>
  );
}
