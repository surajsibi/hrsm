'use client';

import { type JSX, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Description } from '@/components/ui/utils/Descriptions';
import { StepsCircle } from '@/components/ui/utils/StepsCircle';
import { Title } from '@/components/ui/utils/Titles';
import ResetPassword from '@/features/password-reset/ResetEmail';
import SetNewPassword from '@/features/password-reset/SetNewPassword';
import VerifyEmail from '@/features/password-reset/VerifyEmail';

import type { PasswordSetup } from '@/types/passwordSetup.types';

export default function PasswordResetForm(): JSX.Element {
  const methods = useForm<PasswordSetup>({ mode: 'all' });
  const [currentStep, setCurrentStep] = useState<number | null>(1);

  const renderStep = () => {
    if (currentStep && setCurrentStep) {
      switch (currentStep) {
        case 1: {
          return <ResetPassword onNext={() => setCurrentStep(2)} />;
        }
        case 2: {
          return <VerifyEmail onNext={() => setCurrentStep(3)} onPrev={() => setCurrentStep(1)} />;
        }
        case 3: {
          return <SetNewPassword />;
        }
        default: {
          return null;
        }
      }
    }

    return <SetNewPassword />;
  };

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
        <FormProvider {...methods}>{renderStep()}</FormProvider>
      </div>
    </div>
  );
}
