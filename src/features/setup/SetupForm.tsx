'use client';
import { type JSX, useCallback, useMemo, useState } from 'react';

import { Description } from '@/components/ui/Descriptions';
import { StepsCircle } from '@/components/ui/StepsCircle';
import { Title } from '@/components/ui/Titles';
import Complete from '@/features/setup/Complete';
import { Department } from '@/features/setup/Department';
import { Designation } from '@/features/setup/Designation';
import { Organization } from '@/features/setup/Organization';
import { Shifts } from '@/features/setup/Shifts';
import { Users } from '@/features/setup/Users';
import { useAuthStore } from '@/store/auth.store';

export default function SetupForm(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = useMemo(
    () => [
      { id: 1, component: Organization },
      { id: 2, component: Department },
      { id: 3, component: Designation },
      { id: 4, component: Shifts },
      { id: 5, component: Users },
      { id: 6, component: Complete },
    ],
    []
  );

  const totalSteps = steps.length;
  const isComplete = currentStep === totalSteps;

  const goNext = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [currentStep]);
  const goPrev = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const StepComponent = steps[currentStep - 1]?.component;

  const { user } = useAuthStore();

  console.log('uswerrr', user);

  return (
    <div className="max-w-4xl mx-auto pt-8">
      {!isComplete && (
        <header>
          <Title variant="h1">HRMS Setup Wizard</Title>
          <Description size="md">
            Let&apos;s configure your Human Resource Management System
          </Description>
          <section className="flex flex-col p-6 backdrop-blur shadow-lg text-heading bg-card rounded-lg mt-6">
            <div className="flex justify-between items-center mb-4">
              <Title variant="h4">Setup Progress</Title>
              <Description size="sm">
                Step {currentStep} of {totalSteps}
              </Description>
            </div>
            <StepsCircle currentStep={currentStep} />
          </section>
        </header>
      )}

      <section className="space-y-6 backdrop-blur shadow-lg text-heading bg-card rounded-lg mt-6">
        {StepComponent && <StepComponent onNext={goNext} onPrev={goPrev} />}
      </section>
    </div>
  );
}
