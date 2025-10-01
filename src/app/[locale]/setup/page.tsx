'use client';
import { type JSX, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import Department from '@/components/form/setup forms/department/Department';
import Designation from '@/components/form/setup forms/designation/Designation';
import Organization from '@/components/form/setup forms/organization/Organization';
import Shifts from '@/components/form/setup forms/shifts/Shifts';
import Header from '@/components/setup/Header';

import type { FormType } from '@/types/form-types';
import Users from '@/components/form/setup forms/users/Users';

export default function HRMSSetupPage(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<FormType>({
    mode: 'all',
    defaultValues: {
      organization: {
        companyName: '',
        companyType: '',
        companyEmail: '',
        CompanyPhoneNumber: '',
        companyAddress: '',
      },
      department: { departmentNames: [] },
      designation: {},
      Shift: {
        title: '',
        workType: 'Work From Office',
        startingTime: '09:00',
        endingTime: '18:00',
        days: ['Monday'],
        workingHours: 9,
        shiftTracking: false,
        rotationalShifts: false,
      },
      ShiftList: [],
    },
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1: {
        return <Organization onNext={() => setCurrentStep(2)} />;
      }
      case 2: {
        return <Department onNext={() => setCurrentStep(3)} onPrev={() => setCurrentStep(1)} />;
      }
      case 3: {
        return <Designation onNext={() => setCurrentStep(4)} onPrev={() => setCurrentStep(2)} />;
      }
      case 4: {
        return <Shifts onNext={() => setCurrentStep(5)} onPrev={() => setCurrentStep(3)} />;
      }
      case 5: {
        return <Users />;
      }
      default: {
        return null;
      }
    }
  };

  function onSubmit(data: FormType) {
    console.log(data, 'hello');
  }

  return (
    <div className="max-w-4xl mx-auto pt-8">
      <Header currentStep={currentStep} />
      <div className="space-y-6 backdrop-blur shadow-lg text-heading bg-card rounded-lg mt-6">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            {renderStep()}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
