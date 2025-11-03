import { type JSX, memo } from 'react';

import { type Control, Controller, useForm } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { AddedSection } from '@/components/ui/utils/AddSections';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Chips } from '@/components/ui/utils/Chips';
import { Description } from '@/components/ui/utils/Descriptions';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { LineBreak } from '@/components/ui/utils/LineBreak';
import { Note } from '@/components/ui/utils/Note';
import { Selector } from '@/components/ui/utils/Selector';
import { Title } from '@/components/ui/utils/Titles';

import type { DesignationType } from '@/types/form-types';

interface DesignationProps {
  onNext: () => void;
  onPrev: () => void;
  apiDepartments?: string[];
}

const commonDesignations: Record<string, string[]> = {
  'Human Resources': ['HR Manager', 'HR Executive', 'Recruiter', 'HR Business Partner'],
  'Information Technology': [
    'Software Engineer',
    'Senior Developer',
    'Tech Lead',
    'DevOps Engineer',
    'QA Engineer',
  ],
  'Sales & Marketing': [
    'Sales Manager',
    'Sales Executive',
    'Marketing Manager',
    'Digital Marketing Specialist',
  ],
  'Finance & Accounting': [
    'Finance Manager',
    'Accountant',
    'Financial Analyst',
    'Accounts Payable Clerk',
  ],
  Operations: [
    'Operations Manager',
    'Operations Executive',
    'Process Analyst',
    'Operations Coordinator',
  ],
  'Customer Service': [
    'Customer Service Manager',
    'Customer Support Executive',
    'Call Center Agent',
  ],
  'Research & Development': [
    'R&D Manager',
    'Research Scientist',
    'Product Manager',
    'Innovation Lead',
  ],
  'Legal & Compliance': ['Legal Counsel', 'Compliance Officer', 'Legal Executive'],
  Administration: ['Admin Manager', 'Admin Executive', 'Office Assistant', 'Facility Manager'],
  'Quality Assurance': ['QA Manager', 'Quality Analyst', 'QA Lead', 'Test Engineer'],
};

interface DepartmentSectionProps {
  dep: string;
  control: Control<DesignationType>;
}

const DepartmentSection = memo(({ dep, control }: DepartmentSectionProps) => (
  <div
    key={dep}
    className="shadow-md bg-white border border-border rounded-lg p-4 flex flex-col gap-3"
  >
    <div className="flex gap-2 text-primary items-center justify-start">
      <Title variant="h4" className="text-md">
        {dep}
      </Title>
    </div>
    <Controller
      name={`designation.${dep}`}
      control={control}
      render={({ field }) => (
        <Chips
          options={commonDesignations[dep].map(desig => ({ label: desig, value: desig }))}
          values={field.value}
          onChange={field.onChange}
        />
      )}
    />
  </div>
));

function DesignationMemo({
  onNext,
  onPrev,
  apiDepartments = ['Legal & Compliance', 'Quality Assurance', 'Research & Development'],
}: DesignationProps): JSX.Element {
  const { handleSubmit, control, watch, getValues, setValue } = useForm<DesignationType>();

  const designations = watch('designation');

  const cleanDesignationData = () => {
    const cleanedDesignation = Object.fromEntries(
      Object.entries(designations ?? {}).filter(
        ([, desigs]) => Array.isArray(desigs) && desigs.length > 0
      )
    );

    const totalCount = Object.values(cleanedDesignation).length;

    return {
      cleanDesignation: cleanedDesignation,
      totalCount,
    };
  };

  const handleAddCustom = () => {
    const { customDesignationName, customDesignationDepartment, designation = {} } = getValues();

    if (!customDesignationName || !customDesignationDepartment) return;

    const existingDesignation = designation[customDesignationDepartment] ?? [];

    const updated = [...new Set([...existingDesignation, customDesignationName])];

    setValue(`designation.${customDesignationDepartment}`, updated);

    setValue('customDesignationName', '');
    setValue('customDesignationDepartment', '');
  };

  const { cleanDesignation, totalCount } = cleanDesignationData();

  const onSubmit = () => {
    console.log(cleanDesignation);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-6 pt-8 gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1 items-start">
        <Title variant="h3">Designations</Title>
        <Description>Define job roles and positions</Description>
      </div>

      {/* Quick Add */}
      {apiDepartments.map(dep =>
        commonDesignations[dep] ? <DepartmentSection dep={dep} control={control} key={dep} /> : null
      )}

      {/* Add Custom */}
      <Title variant="h3" className="text-start">
        Add Custom Designation
      </Title>

      <div className="flex w-full gap-4">
        <Controller
          name="customDesignationName"
          control={control}
          render={({ field }) => (
            <InputComponent
              label="Designation Name *"
              placeholder="Enter designation name"
              id="designation-name"
              value={field.value ?? ''}
              parentClassName="w-1/2"
              onChange={e => field.onChange(e.target.value)}
              icon="Crown"
            />
          )}
        />
        <Controller
          name="customDesignationDepartment"
          control={control}
          render={({ field }) => (
            <Selector
              placeholder="Select department"
              label="Department *"
              id="department"
              options={apiDepartments || []}
              value={field.value ?? ''}
              onChange={field.onChange}
              disabled={apiDepartments.length === 0}
              className="w-1/2"
            />
          )}
        />
      </div>

      <Buttons
        type="button"
        onClick={handleAddCustom}
        variant="primary"
        size="sm"
        className="w-1/4"
        disabled={!watch('customDesignationName') || !watch('customDesignationDepartment')}
      >
        <div className="flex gap-2 items-center justify-center">
          <Icon name="Plus" variant="normal" /> Add Designation
        </div>
      </Buttons>

      {totalCount > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <Title variant="h3" className="text-start">
              Added Designations
            </Title>
            <div className="bg-[#edeff2] px-2.5 py-0.5 rounded-full items-center justify-center">
              <Description size="sm" className="font-semibold">
                {totalCount} {totalCount > 1 ? 'designations' : 'designation'}
              </Description>
            </div>
          </div>
          <div className="shadow-md space-y-4 bg-white border border-border rounded-lg p-4 text-primary">
            {Object.entries(cleanDesignation).map(([dep, desigs]) =>
              desigs.map((desig, index) => (
                <AddedSection
                  key={index}
                  title={desig}
                  description={`${dep} • Status: ACTIVE`}
                  icon="Crown"
                  onDelete={() => {
                    setValue(
                      `designation.${dep}`,
                      desigs.filter(d => d !== desig)
                    );
                  }}
                />
              ))
            )}
          </div>
        </div>
      )}

      <Note>
        Designations define job roles within departments. You can create hierarchical structures by
        setting reporting relationships.
      </Note>

      <LineBreak />

      <div className="w-full flex justify-between gap-4 items-center">
        <Buttons
          type="button"
          onClick={onNext}
          variant="secondary"
          size="sm"
          className="w-1/2 font-medium text-black"
        >
          Skip This Step
        </Buttons>

        <Buttons type="submit" variant="primary" size="sm" className="w-1/2 font-medium">
          <div className="flex items-center justify-center gap-3 font-medium">
            Continue <Icon name="ArrowRight" color="white" size={16} variant="normal" />
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
          className="text-black font-medium"
        >
          <div className="flex items-center justify-center gap-3 font-medium">
            <Icon name="ArrowLeft" variant="normal" />
            <span className="font-medium text-center">Previous Step</span>
          </div>
        </Buttons>
      </div>
    </form>
  );
}

export const Designation = memo(DesignationMemo);
