'use client';
import { type JSX, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

// import Organization from '@/components/form/setup forms/organization/Organization';
import Department from '@/components/form/setup forms/department/Department';
import Header from '@/components/setup/Header';

export default function HRMSSetupPage(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm({ mode: 'all' });

  return (
    <div className="max-w-4xl mx-auto">
      <Header currentStep={currentStep} />
      <div className="space-y-6 backdrop-blur shadow-lg text-heading bg-card rounded-lg mt-6">
        <FormProvider {...methods}>
          {/* <Organization /> */}
          <Department />
        </FormProvider>
      </div>
    </div>
  );
}
