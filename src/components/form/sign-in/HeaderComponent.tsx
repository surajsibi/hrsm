import { Icon } from '@/components/Icons/Icon';
import { Description } from '@/components/ui/utils/Descriptions';
import { HeaderLogo } from '@/components/ui/utils/HeaderLogos';
import { Title } from '@/components/ui/utils/Titles';

import type { JSX } from 'react';

export function HeaderPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <HeaderLogo variant="square" icon={<Icon name="Building2" size="30" color="white" />} />
      <Title variant="h1">HRMS Portal</Title>
      <Description size="md">Sign in to your admin dashboard</Description>
    </div>
  );
}
