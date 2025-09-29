'use client';
import { Description } from '@/components/ui/utils/Descriptions';
import { StepsCircle } from '@/components/ui/utils/StepsCircle';
import { Title } from '@/components/ui/utils/Titles';

import type { JSX } from 'react';

export default function SetupProgress({ currentStep }: { currentStep?: number }): JSX.Element {
  return (
    <div className="flex flex-col p-6 backdrop-blur shadow-lg text-heading bg-card rounded-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <Title variant="h4">Setup Progress</Title>
        <Description size="sm">Step 1 of 6</Description>
      </div>
      <StepsCircle currentStep={currentStep} />
    </div>
  );
}
