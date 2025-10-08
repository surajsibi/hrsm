'use client';

import { useForm } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Description } from '@/components/ui/utils/Descriptions';
import { HeaderLogo } from '@/components/ui/utils/HeaderLogos';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { Spinner } from '@/components/ui/utils/Spinner';
import { Title } from '@/components/ui/utils/Titles';
import constants from '@/constants/index';

import type { SignInForm as SignInFormType } from '@/types/signin-form-types';
import type { JSX } from 'react';

export default function SignInForm(): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInFormType>({ mode: 'all' });
  const { APP_NAME } = constants;

  const onSubmit = async (data: SignInFormType) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      reset();

      return data;
    } catch (error) {
      console.error('Form submission error:', error);

      return null;
    }
  };

  return (
    <div className="max-w-md w-full flex flex-col justify-center  gap-8">
      <div className="flex flex-col items-center justify-center gap-4 ">
        <HeaderLogo variant="square" icon={<Icon name="Building2" size="30" color="white" />} />
        <Title variant="h1">HRMS Portal</Title>
        <Description size="md">Sign in to your admin dashboard</Description>
      </div>
      <div className="backdrop-blur-sm shadow-lg text-primary bg-[#ffffff80] flex flex-col  w-full  rounded-lg  gap-6">
        <div className="flex  flex-col gap-1 p-6 pb-0  ">
          <Title variant="h3">Welcome Back</Title>
          <Description size="sm">Enter your credentials to access the system</Description>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full px-6 gap-6 flex flex-col py-6 pt-0"
        >
          <InputComponent
            label="Tenant Code"
            placeholder="Enter your tenant code"
            id="tenantCode"
            type="text"
            {...register('tenantCode', {
              required: 'Tenant Code is required',
            })}
            error={errors.tenantCode}
            icon={
              <Icon
                name="Building2"
                size={16}
                color="#7a8799"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
            }
          />
          <InputComponent
            label="Email / Username"
            placeholder="admin@company.com"
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.email}
            icon={
              <Icon
                name="User"
                size={16}
                color="#7a8799"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
            }
          />
          <InputComponent
            label="Password"
            placeholder="Enter your password"
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
            })}
            error={errors.password}
            icon={
              <Icon
                name="Lock"
                size={16}
                color="#7a8799"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
            }
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
