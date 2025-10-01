import { Description } from '@/components/ui/utils/Descriptions';
import { Title } from '@/components/ui/utils/Titles';

import type { JSX } from 'react';

export default function Users(): JSX.Element {
  return (
    <div className="flex flex-col p-6 pt-8 gap-6">
      <div className="flex flex-col gap-1 items-start">
        <Title variant="h3">Users</Title>
        <Description>Add team members</Description>
      </div>

      {/* Quick Add Templates */}
      <div className="flex flex-col gap-1 items-start">
        <Title className="text-md font-medium" variant="h3">
          Add Team Members
        </Title>
        <Description>Create user account for your team members</Description>
      </div>
      <Title className="text-md font-medium" variant="h3">
        Personal Information
      </Title>
    </div>
  );
}
