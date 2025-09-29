'use client';
import { type JSX, useState } from 'react';

import BodyComponent from '@/components/form/passwordSetup/BodyComponent';
import Header from '@/components/form/passwordSetup/Header';

export default function PasswordSetupPage(): JSX.Element {
  const [currentStep, setCurrentStep] = useState<number | null>(null);

  return (
    <div className="max-w-md w-full border-border flex flex-col justify-center h-full">
      <Header currentStep={currentStep} />
      <BodyComponent currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
}
