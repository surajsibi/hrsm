'use client';

import { type JSX, useCallback, useState } from 'react';

import { Description } from '@/components/ui/Descriptions';
import { StepsCircle } from '@/components/ui/StepsCircle';
import { Title } from '@/components/ui/Titles';
import ResetEmail from '@/features/password-reset/ResetEmail';
import SetNewPassword from '@/features/password-reset/SetNewPassword';
import VerifyEmail from '@/features/password-reset/VerifyEmail';

export default function PasswordResetForm(): JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNext = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const handlePrev = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const steps: Record<number, JSX.Element> = {
    1: <ResetEmail onNext={() => handleNext(2)} />,
    2: <VerifyEmail onNext={() => handleNext(3)} onPrev={() => handlePrev(1)} />,
    3: <SetNewPassword />,
  };

  const renderStep = steps[currentStep] ?? <SetNewPassword />;

  return (
    <div className="max-w-md w-full border-border flex flex-col justify-center h-full">
      <header className="space-y-2 flex items-center justify-center flex-col w-full">
        <Title variant="h2">Password Setup</Title>
        <Description size="md">First time login - secure your account</Description>
        {currentStep && (
          <StepsCircle variant="primary" steps={[1, 2, 3]} currentStep={currentStep} />
        )}
      </header>
      <div className="space-y-4 backdrop-blur-sm shadow-lg text-card-foreground bg-card rounded-lg mt-6 p-6 pt-0">
        {renderStep}
      </div>
    </div>
  );
}
