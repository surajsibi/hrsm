import BodyComponent from '@/components/form/sign-in/BodyComponent';
import { HeaderPage } from '@/components/form/sign-in/HeaderComponent';
import { Description } from '@/components/ui/utils/Descriptions';

import type { JSX } from 'react';
export default function signinFormPage(): JSX.Element {
  return (
    <div className="max-w-md w-full flex flex-col justify-center  gap-8">
      <HeaderPage />
      <BodyComponent />
      <Description>&copy; 2024 HRMS Solutions. All Rights Reserved</Description>
    </div>
  );
}
