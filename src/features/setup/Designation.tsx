import { type JSX, useCallback, useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { AddedSection } from '@/components/ui/utils/AddSections';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Description } from '@/components/ui/utils/Descriptions';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { LineBreak } from '@/components/ui/utils/LineBreak';
import { Note } from '@/components/ui/utils/Note';
import { Selector } from '@/components/ui/utils/Selector';
import { Tab } from '@/components/ui/utils/Tabs';
import { Title } from '@/components/ui/utils/Titles';
import { DesignationSchema, type DesignationType } from '@/types/form-types';

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

export default function Designation({
  onNext,
  onPrev,
  apiDepartments = ['Legal & Compliance', 'Quality Assurance'],
}: DesignationProps): JSX.Element {
  const { setValue, getValues, handleSubmit } = useForm<DesignationType>({
    resolver: zodResolver(DesignationSchema),
    defaultValues: { designation: {} },
  });
  const departments: string[] = useMemo(() => apiDepartments, [apiDepartments]);

  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const [activeDesignations, setActiveDesignations] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};

    for (const dep of departments) {
      initial[dep] = getValues(`designation.${dep}`) || [];
    }

    return initial;
  });

  const updateDesignations = useCallback(
    (department: string, designation: string, action: 'add' | 'remove' | 'toggle') => {
      setActiveDesignations(prev => {
        const current = prev[department] || [];
        let updated: string[];

        switch (action) {
          case 'add': {
            updated = current.includes(designation) ? current : [...current, designation];
            break;
          }
          case 'remove': {
            updated = current.filter(d => d !== designation);
            break;
          }
          case 'toggle': {
            updated = current.includes(designation)
              ? current.filter(d => d !== designation)
              : [...current, designation];
            break;
          }
        }

        setValue(`designation.${department}`, updated);

        return { ...prev, [department]: updated };
      });
    },
    [setValue]
  );

  const handleAddCustom = () => {
    if (!inputValue.trim() || !selectedDepartment) return;

    updateDesignations(selectedDepartment, inputValue.trim(), 'add');
    setInputValue('');
    setSelectedDepartment('');
  };

  const designationCount = useMemo(
    () => Object.values(activeDesignations).reduce((acc, curr) => acc + curr.length, 0),
    [activeDesignations]
  );

  const DepartmentCard = ({ department }: { department: string }) => (
    <div className="shadow-md bg-white border border-border rounded-lg p-4 flex flex-col gap-3">
      <div className="flex gap-2 text-primary items-center justify-start">
        <Icon name="Building" variant="normal" />
        <Title variant="h4" className="text-md">
          {department}
        </Title>
      </div>
      <div className="flex flex-wrap gap-2">
        {commonDesignations[department]?.map((designation, i) => (
          <Tab
            key={i}
            active={activeDesignations[department]?.includes(designation)}
            onClick={() => updateDesignations(department, designation, 'toggle')}
          >
            {designation}
          </Tab>
        ))}
      </div>
    </div>
  );

  const AddedDesignationList = () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <Title variant="h3" className="text-start">
          Added Designations
        </Title>
        <div className="bg-[#edeff2] px-2.5 py-0.5 rounded-full items-center justify-center">
          <Description size="sm" className="font-semibold">
            {designationCount} {designationCount > 1 ? 'designations' : 'designation'}
          </Description>
        </div>
      </div>
      <div className="shadow-md space-y-4 bg-white border border-border rounded-lg p-4 text-primary">
        {Object.entries(activeDesignations).map(([department, desigs]) =>
          desigs.map((des, i) => (
            <AddedSection
              key={`${department}-${i}`}
              title={des}
              description={department}
              icon={<Icon name="Crown" variant="normal" />}
              onDelete={() => updateDesignations(department, des, 'remove')}
            />
          ))
        )}
      </div>
    </div>
  );

  const onSubmit = (data: DesignationType) => {
    console.log(data);
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
      <div className="flex flex-col gap-1 items-start">
        <Title variant="h3">Quick Add by Department</Title>
        <Description>Click on common designations to add them quickly</Description>
      </div>
      {departments.length > 0
        ? departments.map(dep =>
            commonDesignations[dep] ? <DepartmentCard key={dep} department={dep} /> : null
          )
        : null}

      {/* Add Custom */}
      <Title variant="h3" className="text-start">
        Add Custom Designation
      </Title>
      <div className="flex w-full gap-4">
        <InputComponent
          label="Designation Name *"
          placeholder="Enter designation name"
          value={inputValue}
          parentClassName="w-1/2"
          onChange={e => setInputValue(e.target.value)}
          icon={<Icon name="Crown" />}
        />

        <Selector
          placeholder="Select department"
          label="Department *"
          options={departments || []}
          value={selectedDepartment}
          onChange={setSelectedDepartment}
          disabled={departments.length === 0}
          className="w-1/2"
        />
      </div>
      <Buttons
        type="button"
        onClick={handleAddCustom}
        variant="primary"
        size="sm"
        className="w-1/4"
        disabled={!inputValue || !selectedDepartment || departments.length === 0}
      >
        <div className="flex gap-2 items-center justify-center">
          <Icon name="Plus" variant="normal" /> Add Designation
        </div>
      </Buttons>

      {designationCount > 0 && <AddedDesignationList />}

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
