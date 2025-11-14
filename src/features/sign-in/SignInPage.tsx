'use client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { login } from '@/actions/login';
import { SignInForm } from '@/features/sign-in/SignInForm';
import { useAuthStore } from '@/store/auth.store';

import type { SignInFormType } from '@/types/signin-form-types';
import type { JSX } from 'react';

export function SignInPage(): JSX.Element {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (data: SignInFormType) => {
    try {
      const res = await login(data);

      if (res.success) {
        setUser(res.user);
        console.log('success', res);
        await signIn('credentials', {
          redirect: false,
          ...res.tokens,
        });
        router.push('/dashboard');
      } else {
        console.log('failed', res.message);
      }
    } catch (error) {
      console.log('Form submission error:', error);
    }
  };

  return <SignInForm onSubmit={handleSubmit} />;
}
