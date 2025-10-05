'use client';
import { type JSX, useState } from 'react';

import Complete from '@/components/form/setup forms/completed/Complete';
import Department from '@/components/form/setup forms/department/Department';
import Designation from '@/components/form/setup forms/designation/Designation';
import Organization from '@/components/form/setup forms/organization/Organization';
import Shifts from '@/components/form/setup forms/shifts/Shifts';
import Users from '@/components/form/setup forms/users/Users';
import Header from '@/components/setup/Header';

export default function HRMSSetupPage(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(5);

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
        return <Users onNext={() => setCurrentStep(6)} onPrev={() => setCurrentStep(4)} />;
      }
      case 6: {
        return <Complete />;
      }
      default: {
        return null;
      }
    }
  };

  const isComplete = currentStep === 6;

  return (
    <div className="max-w-4xl mx-auto pt-8">
      {!isComplete && <Header currentStep={currentStep} />}
      <div className="space-y-6 backdrop-blur shadow-lg  text-heading bg-card rounded-lg mt-6">
        {renderStep()}
      </div>
    </div>
  );
}
