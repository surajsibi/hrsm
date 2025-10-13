'use client';
import { login } from '@/actions/auth';
import SignInForm from '@/features/sign-in/SignInForm';

import type { SignInFormType } from '@/types/signin-form-types';
import type { JSX } from 'react';

export function SignInPage(): JSX.Element {
  const formSubmit = (data: SignInFormType) => {
    login(data);
  };

  return <SignInForm formSubmit={formSubmit} />;
}
