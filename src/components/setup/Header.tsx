import SetupProgress from '@/components/setup/SetupProgress';
import { Description } from '@/components/ui/utils/Descriptions';
import { Title } from '@/components/ui/utils/Titles';

import type { JSX } from 'react';

export default function Header({ currentStep }: { currentStep?: number }): JSX.Element {
  return (
    <div>
      <Title variant="h1">HRMS Setup Wizard</Title>
      <Description size="md">Let's configure your Human Resource Management System</Description>
      <SetupProgress currentStep={currentStep} />
    </div>
  );
}
