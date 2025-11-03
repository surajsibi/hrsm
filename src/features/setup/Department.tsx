import { type JSX, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { AddedSection } from '@/components/ui/utils/AddSections';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Chips } from '@/components/ui/utils/Chips';
import { Description } from '@/components/ui/utils/Descriptions';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { LineBreak } from '@/components/ui/utils/LineBreak';
import { Note } from '@/components/ui/utils/Note';
import { Title } from '@/components/ui/utils/Titles';
import { quickAddDepartments } from '@/constants/department';
import { DepartmentSchema, type DepartmentType } from '@/types/form-types';

export function Department({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}): JSX.Element {
  const { control, setValue, getValues, handleSubmit } = useForm<DepartmentType>({
    resolver: zodResolver(DepartmentSchema),
  });

  const selectedDepartments = useWatch({
    control,
    name: 'departmentNames',
    defaultValue: [],
  });

  const onDelete = useCallback(
    (name: string) => {
      const updated = selectedDepartments?.filter(dep => dep !== name);

      setValue('departmentNames', updated);
    },
    [selectedDepartments, setValue]
  );

  const onSubmit = (data: DepartmentType) => {
    console.log(data);
    onNext();
  };

  const handleAddDepartment = useCallback(() => {
    const name = getValues('customDepartment')?.trim();

    if (name) {
      const updated = [...new Set([...(selectedDepartments ?? []), name])];

      setValue('departmentNames', updated);
      setValue('customDepartment', '');
    }
  }, [selectedDepartments, setValue, getValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-6 pt-8 gap-6">
      {/* Header */}

      <div className="flex flex-col gap-1 items-start">
        <Title variant="h3">Departments</Title>
        <Description>Create organizational departments</Description>
      </div>
      <div className="flex flex-col gap-1 items-start">
        <Title variant="h3">Quick Add Departments</Title>
        <Description>Click on common departments to add them quickly</Description>
      </div>

      {/* Quick Add Tabs */}

      <Controller
        name="departmentNames"
        control={control}
        render={({ field }) => (
          <Chips
            options={quickAddDepartments}
            values={selectedDepartments}
            onChange={field.onChange}
          />
        )}
      />

      {/* Custom Departments Input */}

      <Title variant="h3" className="text-start">
        Add Custom Departments
      </Title>
      <div className="flex gap-5 items-end">
        <Controller
          name="customDepartment"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="flex gap-5 items-end w-full">
              <InputComponent
                id="custom-department"
                type="text"
                className="w-full"
                placeholder="Enter department name"
                value={field.value}
                onChange={field.onChange}
                icon="Briefcase"
              />

              <Buttons
                aria-label="Add department"
                disabled={!field?.value?.trim()}
                onClick={handleAddDepartment}
                variant="primary"
                className="h-12"
              >
                <Icon name="Plus" size={20} color="white" variant="normal" />
              </Buttons>
            </div>
          )}
        />
      </div>

      {/* Selected Departments */}

      {selectedDepartments && selectedDepartments?.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <Title variant="h3" className="text-start">
              Added Departments
            </Title>
            <div className="bg-[#edeff2] px-2.5 py-0.5 rounded-full items-center justify-center">
              <Description size="sm" className="font-semibold">
                {selectedDepartments.length}{' '}
                {selectedDepartments.length === 1 ? 'department' : 'departments'}
              </Description>
            </div>
          </div>
          <div className="shadow-md space-y-4 bg-white border-border border rounded-lg p-4">
            {selectedDepartments?.map((tab, index) => (
              <AddedSection key={index} title={tab} onDelete={() => onDelete(tab)} />
            ))}
          </div>
        </div>
      )}

      {/* Notes */}

      <Note>
        &nbsp; Departments help organize your workforce into functional groups. You can add more
        departments later or modify existing ones from the dashboard
      </Note>
      <LineBreak />

      <div className="flex justify-between gap-4">
        <Buttons
          variant="secondary"
          type="button"
          size="sm"
          className="w-1/2 text-[#344256] font-medium"
          onClick={onNext}
        >
          Skip This Step
        </Buttons>
        <Buttons type="submit" variant="primary" size="sm" className="w-1/2 font-medium">
          <p className="flex items-center justify-center gap-4">
            <span className="font-semibold text-center">Continue</span>
            <Icon name="ArrowRight" size={16} color="white" variant="normal" />
          </p>
        </Buttons>
      </div>

      <LineBreak />
      <div className="flex justify-start items-center gap-4 w-fit px-2">
        <Buttons
          onClick={onPrev}
          variant="secondary"
          type="button"
          size="sm"
          className="text-black font-medium"
        >
          <p className="flex items-center justify-center gap-4">
            <Icon name="ArrowLeft" variant="normal" />
            <span className="font-medium text-center">Previous Step</span>
          </p>
        </Buttons>
      </div>
    </form>
  );
}
