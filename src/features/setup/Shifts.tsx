import { type JSX, useCallback, useEffect } from 'react';

import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { AddedSection } from '@/components/ui/AddSections';
import { AddShift } from '@/components/ui/AddShift';
import { Button } from '@/components/ui/Button';
import { Description } from '@/components/ui/Descriptions';
import { InputComponent } from '@/components/ui/InputComponent';
import { Label } from '@/components/ui/Label';
import { LineBreak } from '@/components/ui/LineBreak';
import { Note } from '@/components/ui/Note';
import { Selector } from '@/components/ui/Selector';
import { TickLabel } from '@/components/ui/TickLabel';
import { Title } from '@/components/ui/Titles';
import { cn } from '@/utils';

import type { IShiftFormType, IShiftList } from '@/types/form-types';

const workTypes = ['Work From Home', 'Work From Office', 'Hybrid Work'];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ShiftTemplates = [
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
];

const defaultShift = {
  title: '',
  workType: 'Work From Office',
  startingTime: '09:00',
  endingTime: '18:00',
  days: ['Monday'],
  workingHours: '9',
  shiftTracking: false,
  rotationalShifts: false,
};

const DaySelector =
  // eslint-disable-next-line no-unused-vars
  ({ days, toggleDay }: { days: string[]; toggleDay: (day: string) => void }) => (
    <div className="flex gap-2 flex-wrap">
      {weekDays.map(day => (
        <button
          key={day}
          onClick={() => toggleDay(day)}
          type="button"
          className={cn(
            'ring-offset-[#fcfcfc] font-[400] text-sm px-3 py-2 bg-[#fcfcfc] text-black border border-[#dfe2e7] rounded-md gap-2 flex items-center justify-center hover:text-[#3c83f6] hover:bg-(--gradient-primary)/30 cursor-pointer transition-all duration-300',
            {
              'bg-(--gradient-primary) hover:bg-(--gradient-primary)/50 text-white hover:text-white':
                days.includes(day),
            }
          )}
        >
          {day}
        </button>
      ))}
    </div>
  );

export function Shifts({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}): JSX.Element {
  const { control, handleSubmit, setValue, watch } = useForm<IShiftFormType>({
    defaultValues: {
      currentShift: {
        title: '',
        workType: 'Work From Office',
        startingTime: '09:00',
        endingTime: '18:00',
        days: ['Monday'],
        workingHours: '9',
        shiftTracking: false,
        rotationalShifts: false,
      },
      ShiftList: [],
    },
  });

  const currentShift = watch('currentShift');

  const {
    fields: shifts,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'ShiftList',
  });

  const onSubmit = useCallback(
    (data: IShiftList) => {
      console.log(data);
      onNext();
    },
    [onNext]
  );

  const calculateWorkHours = useCallback((start: string, end: string) => {
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);

    const startMinutes = startH * 60 + startM;
    let endMinutes = endH * 60 + endM;

    if (endMinutes <= startMinutes) endMinutes += 24 * 60;

    return Math.round(((endMinutes - startMinutes) / 60) * 100) / 100;
  }, []);

  const handleAddShift = () => {
    append({
      ...currentShift,
      workingHours:
        currentShift.workingHours ||
        calculateWorkHours(currentShift.startingTime, currentShift.endingTime).toString(),
    });

    setValue('currentShift', defaultShift);
  };

  useEffect(() => {
    const hours = calculateWorkHours(currentShift.startingTime, currentShift.endingTime);

    setValue('currentShift.workingHours', hours.toString());
  }, [currentShift.startingTime, currentShift.endingTime]);

  const days = currentShift.days;
  const toggleDay = useCallback(
    (day: string) => {
      const updated = days.includes(day) ? days.filter(d => d !== day) : [...days, day];

      setValue('currentShift.days', updated);
    },
    [days, setValue, currentShift]
  );

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
        <Controller
          name="currentShift.title"
          control={control}
          render={({ field }) => (
            <InputComponent
              {...field}
              label="Shift Name *"
              id="shiftName"
              placeholder="Enter shift name"
              parentClassName="w-1/2"
              icon="Clock"
            />
          )}
        />

        <Controller
          name="currentShift.workType"
          control={control}
          render={({ field }) => (
            <Selector
              {...field}
              className="w-1/2"
              options={workTypes}
              id="workType"
              label="Work Type *"
            />
          )}
        />
      </div>

      {/* times + hours */}
      <div className="flex gap-4 w-full">
        <Controller
          name="currentShift.startingTime"
          control={control}
          render={({ field }) => (
            <InputComponent
              {...field}
              label="Check-in Time *"
              id="checkInTime"
              type="time"
              parentClassName="w-1/2"
            />
          )}
        />

        <Controller
          name="currentShift.endingTime"
          control={control}
          render={({ field }) => (
            <InputComponent
              {...field}
              type="time"
              label="Check-out Time *"
              id="checkOutTime"
              parentClassName="w-1/2"
            />
          )}
        />

        <Controller
          name="currentShift.workingHours"
          control={control}
          render={({ field }) => (
            <InputComponent
              {...field}
              label="Working Hours *"
              id="workingHours"
              parentClassName="w-1/2"
              readOnly
            />
          )}
        />
      </div>

      {/* Days */}
      <div className="flex flex-col gap-1 items-start">
        <Label className="mb-2">Weekend Days</Label>
        <div className="flex gap-2 flex-wrap">
          <DaySelector days={currentShift.days ?? []} toggleDay={toggleDay} />
        </div>
      </div>

      {/* flags */}
      <div className="flex flex-col justify-center gap-3 items-start">
        <Controller
          name="currentShift.shiftTracking"
          control={control}
          render={({ field }) => (
            <TickLabel checked={field.value} onChange={() => field.onChange(!field.value)}>
              Enable shift tracking
            </TickLabel>
          )}
        />

        <Controller
          name="currentShift.rotationalShifts"
          control={control}
          render={({ field }) => (
            <TickLabel checked={field.value} onChange={() => field.onChange(!field.value)}>
              Rotational shift
            </TickLabel>
          )}
        />
      </div>

      <Button
        aria-label="add custom shifts"
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
        startIcon="ArrowLeft"
        iconColor="white"
      >
        Add Shift
      </Button>

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
                icon="Crown"
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
        <Button
          type="button"
          variant="secondary"
          onClick={onNext}
          size="sm"
          className="w-1/2 font-medium text-black"
        >
          Skip This Step
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="w-1/2 font-medium"
          endIcon="ArrowRight"
          iconColor="white"
        >
          <p className="flex items-center justify-center gap-4">
            <span className="font-semibold text-center">Continue</span>
          </p>
        </Button>
      </div>

      <LineBreak />
      <div className="flex justify-start items-center gap-4 w-fit px-2">
        <Button
          onClick={onPrev}
          variant="secondary"
          type="button"
          size="sm"
          className="text-black font-medium"
          startIcon="ArrowLeft"
        >
          <p className="flex items-center justify-center gap-4">
            <span className="font-medium text-center">Previous Step</span>
          </p>
        </Button>
      </div>
    </form>
  );
}
