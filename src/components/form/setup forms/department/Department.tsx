import { type JSX, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { Description } from '@/components/ui/utils/Descriptions';
import { Tab } from '@/components/ui/utils/Tabs';
import { Title } from '@/components/ui/utils/Titles';

import type { DepartmentType } from '@/types/form-types';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { Icon } from '@/components/Icons/Icon';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Primary } from '@/stories/AddShift.stories';

export default function Department(): JSX.Element {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useFormContext<DepartmentType>();
  const onSubmit = async (data: DepartmentType) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));

      reset();

      return data;
    } catch (error) {
      console.error('Form submission error:', error);

      return null;
    }
  };

  const [tabs, setTabs] = useState([
    { name: 'Human Resources', active: false },
    { name: 'Information Technology', active: false },
    { name: 'Sales & Marketing', active: false },
    { name: 'Finance & Accounting', active: false },
    { name: 'Operations', active: false },
    { name: 'Customer Service', active: false },
    { name: 'Research & Development', active: false },
    { name: 'Legal & Compliance', active: false },
    { name: 'Administration', active: false },
    { name: 'Quality Assurance', active: false },
  ]);

  const toggleTab = (index: number) => {
    setTabs(prev => prev.map((tab, i) => (i === index ? { ...tab, active: !tab.active } : tab)));
  };

  return (
    <div className="flex flex-col p-6 gap-6">
      <div className="flex flex-col gap-1 items-start">
        <Title variant="h3">Departments</Title>
        <Description>Create organizational departments</Description>
      </div>
      <div className="flex flex-col gap-1 items-start">
        <Title variant="h3">Quick Add Departments</Title>
        <Description>Click on common departments to add them quickly</Description>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
        <div className="flex flex-wrap gap-2 space-y-4">
          {tabs.map(tab => (
            <Tab active={tab.active} key={tab.name} onClick={() => toggleTab(tabs.indexOf(tab))}>
              {tab.name}
            </Tab>
          ))}
        </div>
        <Title variant="h3" className="text-start">
          Add Custom Departments
        </Title>
        <div className="flex gap-5">
          <InputComponent
            type="text"
            placeholder="Enter department names"
            icon={
              <Icon
                name="Briefcase"
                size={16}
                color="#7a8799"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
            }
          />
          <Buttons variant="primary">
            <Icon name="Plus" size={16} color="#7a8799" />
          </Buttons>
        </div>
      </form>
    </div>
  );
}
