'use client';

import { type JSX, useCallback, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { login } from '@/actions/auth';
import SignInForm from '@/features/sign-in/SignInForm';

import type { SignInFormType } from '@/types/signin-form-types';

export function SignInPage(): JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const formSubmit = useCallback(
    async (data: SignInFormType) => {
      try {
        console.log('Form Data:', data);

        const response = await login(data);

        if (!response.success) {
          console.error('Login failed:', response.message);

          return;
        }

        console.log('Login Response:', response);

        startTransition(() => {
          router.push('/password-reset');
        });
      } catch (error) {
        console.error('Login failed:', error);
        // TODO: show toast or UI error feedback
      }
    },
    [router]
  );

  return <SignInForm formSubmit={formSubmit} isPending={isPending} />;
}

export default SignInPage;
