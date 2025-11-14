'use client';

import { type JSX } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Description } from '@/components/ui/Descriptions';
import { HeaderLogo } from '@/components/ui/HeaderLogos';
import { InputComponent } from '@/components/ui/InputComponent';
import { Spinner } from '@/components/ui/Spinner';
import { Title } from '@/components/ui/Titles';
import { SignInFormSchema, type SignInFormType } from '@/types/signin-form-types';

interface SignInFormProps {
  onSubmit: (_data: SignInFormType) => void | Promise<void>;
}

export function SignInForm({ onSubmit }: SignInFormProps): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormSchema),
    mode: 'all',
  });

  return (
    <section className="w-full max-w-md mx-auto flex flex-col justify-center gap-8">
      <header className="flex flex-col items-center justify-center gap-4">
        <HeaderLogo variant="square" icon="Building2" />
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
            {...register('tenantCode')}
            error={errors.tenantCode}
            icon="Building2"
          />

          <InputComponent
            label="Email"
            placeholder="admin@company.com"
            id="email"
            type="email"
            {...register('email')}
            error={errors.email}
            icon="User"
          />

          <InputComponent
            label="Password"
            placeholder="Enter your password"
            id="password"
            type="password"
            {...register('password')}
            error={errors.password}
            icon="Lock"
          />

          <Button
            variant="primary"
            loading={isSubmitting}
            disabled={isSubmitting || !isValid}
            loadingChildren={
              <span className="flex items-center gap-2">
                <Spinner /> Signing...
              </span>
            }
            className="w-full text-white"
          >
            Sign In to Dashboard
          </Button>
        </form>
      </article>
    </section>
  );
}
