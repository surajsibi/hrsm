import { Icon } from '@/components/Icons/Icon';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Description } from '@/components/ui/utils/Descriptions';
import { HeaderLogo } from '@/components/ui/utils/HeaderLogos';
import { Title } from '@/components/ui/utils/Titles';

import type { JSX } from 'react';

export default function Complete(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-4 my-[30%] p-5">
      <HeaderLogo icon={<Icon name="Check" size="30" color="white" />} variant="rounded" />
      <Title variant="h1">Setup Completed</Title>
      <Description>
        Your HRMS system has been successfully congigured. you can now start managing your
        organization
      </Description>
      <div className="space-y-6 p-4 bg-[#f0f2f480] rounded-lg w-full">
        <Title variant="h4">Summary:</Title>
        <div className="space-y-2 text-paragraph text-sm ">
          <Description>✓ Organization: Configured</Description>
          <Description>✓ Departments: 0 created</Description>
          <Description>✓ Designations: 0 created</Description>
          <Description>✓ Shifts: 0 created</Description>
          <Description>✓ Users: 0 added</Description>
        </div>
      </div>
      <Buttons className="w-fit" variant="primary">
        Go to Dashboard
      </Buttons>
    </div>
  );
}
