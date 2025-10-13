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
import { Tab } from '@/components/ui/utils/Tabs';
import { Title } from '@/components/ui/utils/Titles';
import { DepartmentSchema, type DepartmentType } from '@/types/form-types';

export default function Department({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}): JSX.Element {
  const { setValue, getValues, handleSubmit } = useForm<DepartmentType>({
    resolver: zodResolver(DepartmentSchema),
  });

  const quickAddDepartments = useMemo(
    () => [
      'Human Resources',
      'Information Technology',
      'Sales & Marketing',
      'Finance & Accounting',
      'Operations',
      'Customer Service',
      'Research & Development',
      'Legal & Compliance',
      'Administration',
      'Quality Assurance',
    ],
    []
  );

  const [tabs, setTabs] = useState(quickAddDepartments.map(name => ({ name, active: false })));

  const [selectedTab, setSelectedTab] = useState<string[]>(getValues('departmentNames') ?? []);
  const [inputValue, setInputValue] = useState('');

  const toggleTab = useCallback(
    (index: number) => {
      const name = tabs[index].name;

      setTabs(prev => prev.map((tab, i) => (i === index ? { ...tab, active: !tab.active } : tab)));

      setSelectedTab(prev => {
        if (prev.includes(name)) return prev;

        const updated = [...prev, name];

        setValue('departmentNames', updated);

        return updated;
      });
    },
    [tabs, setValue]
  );

  const onDelete = useCallback(
    (name: string) => {
      setSelectedTab(prev => {
        const updated = prev.filter(dep => dep !== name);

        setValue('departmentNames', updated);

        return updated;
      });

      setTabs(prev => prev.map(tab => (tab.name === name ? { ...tab, active: false } : tab)));
    },
    [setValue]
  );

  // Add custom department(s)
  const addCustomDepartment = useCallback(() => {
    const entries = inputValue
      .split(',')
      .map(name => name.trim())
      .filter(Boolean);

    if (entries.length === 0) return;

    setSelectedTab(prev => {
      const updated = [...new Set([...prev, ...entries])];

      setValue('departmentNames', updated);

      return updated;
    });

    setInputValue('');
  }, [inputValue, setValue]);

  const onSubmit = (data: DepartmentType) => {
    console.log(data);
    onNext();
  };

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
      <div className="flex flex-wrap gap-2 space-y-2">
        {tabs.map((tab, i) => (
          <Tab key={tab.name} active={tab.active} onClick={() => toggleTab(i)}>
            {tab.name}
          </Tab>
        ))}
      </div>

      {/* Custom Departments Input */}
      <Title variant="h3" className="text-start">
        Add Custom Departments
      </Title>
      <div className="flex gap-5 items-end">
        <InputComponent
          type="text"
          placeholder="Enter department names"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          icon={
            <Icon
              name="Briefcase"
              size={16}
              color="#7a8799"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            />
          }
        />
        <Buttons
          disabled={inputValue === ''}
          onClick={addCustomDepartment}
          variant="primary"
          className="h-12"
        >
          <Icon name="Plus" size={20} color="white" />
        </Buttons>
      </div>

      {/* Selected Departments */}
      {selectedTab.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <Title variant="h3" className="text-start">
              Added Departments
            </Title>
            <div className="bg-[#edeff2] px-2.5 py-0.5 rounded-full items-center justify-center">
              <Description size="sm" className="font-semibold">
                {selectedTab.length} {selectedTab.length === 1 ? 'department' : 'departments'}
              </Description>
            </div>
          </div>
          <div className="shadow-md space-y-4 bg-white border-border border rounded-lg p-4">
            {selectedTab.map((tab, index) => (
              <AddedSection
                key={index}
                title={tab}
                description="Status: ACTIVE"
                onDelete={() => onDelete(tab)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Notes & Actions */}
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
            <Icon name="ArrowRight" size={16} color="white" />
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
            <Icon name="ArrowLeft" size={16} />
            <span className="font-medium text-center">Previous Step</span>
          </p>
        </Buttons>
      </div>
    </form>
  );
}
