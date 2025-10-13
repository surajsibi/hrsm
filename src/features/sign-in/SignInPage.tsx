'use client';
import SignInForm from '@/features/sign-in/SignInForm';

import type { SignInFormType } from '@/types/signin-form-types';
import type { JSX } from 'react';

export function SignInPage(): JSX.Element {
  const formSubmit = (data: SignInFormType) => {
    console.log('data', data);
  };

  return <SignInForm formSubmit={formSubmit} />;
}
