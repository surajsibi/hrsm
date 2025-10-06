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
  const [currentStep, setCurrentStep] = useState(1);

  function goNext() {
    setCurrentStep(currentStep + 1);
  }
  function goPrev() {
    setCurrentStep(currentStep - 1);
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: {
        return <Organization onNext={goNext} />;
      }
      case 2: {
        return <Department onNext={goNext} onPrev={goPrev} />;
      }
      case 3: {
        return <Designation onNext={goNext} onPrev={goPrev} />;
      }
      case 4: {
        return <Shifts onNext={goNext} onPrev={goPrev} />;
      }
      case 5: {
        return <Users onNext={goNext} onPrev={goPrev} />;
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
