import { Description } from '@/components/ui/utils/Descriptions';
import { StepsCircle } from '@/components/ui/utils/StepsCircle';
import { Title } from '@/components/ui/utils/Titles';

import type { JSX } from 'react';

export default function Header({ currentStep }: { currentStep?: number | null }): JSX.Element {
  return (
    <header className=" space-y-2 flex items-center justify-center flex-col w-full ">
      <Title variant="h2">Password Setup</Title>
      <Description size="md">First time login - secure your account</Description>
      {currentStep && <StepsCircle variant="primary" steps={[1, 2, 3]} currentStep={currentStep} />}
    </header>
  );
}
