'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Description } from '@/components/ui/utils/Descriptions';
import { HeaderLogo } from '@/components/ui/utils/HeaderLogos';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { Spinner } from '@/components/ui/utils/Spinner';
import { Title } from '@/components/ui/utils/Titles';
import constants from '@/constants/index';
import { SignInFormSchema } from '@/types/signin-form-types';

// eslint-disable-next-line no-duplicate-imports
import type { SignInFormType } from '@/types/signin-form-types';
import type { JSX } from 'react';

export default function SignInForm({
  formSubmit,
}: {
  formSubmit: (_data: SignInFormType) => void;
}): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInFormType>({ resolver: zodResolver(SignInFormSchema), mode: 'all' });
  const { APP_NAME } = constants;

  const submit = (data: SignInFormType) => {
    try {
      reset();
      formSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="max-w-md w-full flex flex-col justify-center  gap-8">
      <div className="flex flex-col items-center justify-center gap-4 ">
        <HeaderLogo
          variant="square"
          icon={<Icon name="Building2" size="30" color="white" variant="header" />}
        />
        <Title variant="h1">HRMS Portal</Title>
        <Description size="md">Sign in to your admin dashboard</Description>
      </div>
      <div className="backdrop-blur-sm shadow-lg text-primary bg-[#ffffff80] flex flex-col  w-full  rounded-lg  gap-6">
        <div className="flex  flex-col gap-1 p-6 pb-0  ">
          <Title variant="h3">Welcome Back</Title>
          <Description size="sm">Enter your credentials to access the system</Description>
        </div>
        <form
          onSubmit={handleSubmit(submit)}
          className="w-full h-full px-6 gap-6 flex flex-col py-6 pt-0"
        >
          <InputComponent
            label="Tenant Code"
            placeholder="Enter your tenant code"
            id="tenantCode"
            type="text"
            {...register('tenantCode')}
            error={errors.tenantCode}
            icon={<Icon name="Building2" />}
          />
          <InputComponent
            label="Email / Username"
            placeholder="admin@company.com"
            id="email"
            type="email"
            {...register('email')}
            error={errors.email}
            icon={<Icon name="User" />}
          />
          <InputComponent
            label="Password"
            placeholder="Enter your password"
            id="password"
            type="password"
            {...register('password')}
            error={errors.password}
            icon={<Icon name="Lock" />}
          />
          <Buttons
            variant="primary"
            loading={isSubmitting}
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
      </div>
      <footer className="text-paragraph text-center ">&copy;{APP_NAME} All Rights Reserved</footer>
    </div>
  );
}
