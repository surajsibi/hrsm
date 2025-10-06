import { type JSX } from 'react';

import { Icon } from '@/components/Icons/Icon';
import { Description } from '@/components/ui/utils/Descriptions';
import { HeaderLogo } from '@/components/ui/utils/HeaderLogos';
import { Title } from '@/components/ui/utils/Titles';
import constants from '@/constants/index';
import SignInForm from '@/features/sign-in/SignInForm';

export function SignInPage(): JSX.Element {
  const { APP_NAME } = constants;

  return (
    <div className="max-w-md w-full flex flex-col justify-center  gap-8">
      {/* Header  */}
      <div className="flex flex-col items-center justify-center gap-4 ">
        <HeaderLogo variant="square" icon={<Icon name="Building2" size="30" color="white" />} />
        <Title variant="h1">HRMS Portal</Title>
        <Description size="md">Sign in to your admin dashboard</Description>
      </div>
      {/* form  */}
      <SignInForm />

      <footer className="text-paragraph text-center ">&copy;{APP_NAME} All Rights Reserved</footer>
    </div>
  );
}
