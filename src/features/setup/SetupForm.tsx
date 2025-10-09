'use client';
import { type JSX, useState } from 'react';

import { Description } from '@/components/ui/utils/Descriptions';
import { StepsCircle } from '@/components/ui/utils/StepsCircle';
import { Title } from '@/components/ui/utils/Titles';
import Complete from '@/features/setup/Complete';
import Department from '@/features/setup/Department';
import Designation from '@/features/setup/Designation';
import Organization from '@/features/setup/Organization';
import Shifts from '@/features/setup/Shifts';
import Users from '@/features/setup/Users';

export default function SetupForm(): JSX.Element {
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
      {!isComplete && (
        <div>
          <Title variant="h1">HRMS Setup Wizard</Title>
          <Description size="md">Let's configure your Human Resource Management System</Description>
          <div className="flex flex-col p-6 backdrop-blur shadow-lg text-heading bg-card rounded-lg mt-6">
            <div className="flex justify-between items-center mb-4">
              <Title variant="h4">Setup Progress</Title>
              <Description size="sm">Step 1 of 6</Description>
            </div>
            <StepsCircle currentStep={currentStep} />
          </div>
        </div>
      )}
      <div className="space-y-6 backdrop-blur shadow-lg  text-heading bg-card rounded-lg mt-6">
        {renderStep()}
      </div>
    </div>
  );
}
