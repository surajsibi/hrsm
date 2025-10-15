'use client';

import { type JSX, memo, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Description } from '@/components/ui/utils/Descriptions';
import { HeaderLogo } from '@/components/ui/utils/HeaderLogos';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { Spinner } from '@/components/ui/utils/Spinner';
import { Title } from '@/components/ui/utils/Titles';
import { SignInFormSchema, type SignInFormType } from '@/types/signin-form-types';

/**
 * Optimized SignInForm
 * - Uses `useCallback` to memoize submit handler
 * - Uses `memo` to avoid unnecessary re-renders
 * - Removes unnecessary wrapping div nesting
 * - Uses minimal re-renders by relying on RHF's built-in optimization
 * - Improves accessibility & semantics
 */
function SignInFormBase({
  formSubmit,
  isPending,
}: {
  formSubmit: (_data: SignInFormType) => void;
  isPending: boolean;
}): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormSchema),
    mode: 'all',
  });

  const onSubmit = useCallback(
    async (data: SignInFormType) => {
      try {
        formSubmit(data);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    },
    [formSubmit]
  );

  return (
    <section className="w-full max-w-md mx-auto flex flex-col justify-center gap-8">
      <header className="flex flex-col items-center justify-center gap-4">
        <HeaderLogo
          variant="square"
          icon={<Icon name="Building2" size="30" color="white" variant="normal" />}
        />
        <Title variant="h1">HRMS Portal</Title>
        <Description size="md">Sign in to your admin dashboard</Description>
      </header>

      <article className="bg-white/50 backdrop-blur-sm shadow-lg text-primary rounded-lg flex flex-col gap-6">
        <div className="flex flex-col gap-1 p-6 pb-0">
          <Title variant="h3">Welcome Back</Title>
          <Description size="sm">Enter your credentials to access the system</Description>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 p-6 pt-0" noValidate>
          <InputComponent
            label="Tenant Code"
            placeholder="Enter your tenant code"
            id="tenantCode"
            type="text"
            autoComplete="organization"
            {...register('tenantCode')}
            error={errors.tenantCode}
            icon={<Icon name="Building2" />}
          />

          <InputComponent
            label="Email / Username"
            placeholder="admin@company.com"
            id="email"
            type="email"
            autoComplete="username"
            {...register('email')}
            error={errors.email}
            icon={<Icon name="User" />}
          />

          <InputComponent
            label="Password"
            placeholder="Enter your password"
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password')}
            error={errors.password}
            icon={<Icon name="Lock" />}
          />

          <Buttons
            variant="primary"
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || isPending}
            loadingChildren={
              <span className="flex items-center gap-2">
                <Spinner /> Signing...
              </span>
            }
            className="w-full text-white"
          >
            Sign In to Dashboard
          </Buttons>
        </form>
      </article>
    </section>
  );
}

const SignInForm = memo(SignInFormBase);

export default SignInForm;
