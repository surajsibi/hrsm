'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Description } from '@/components/ui/utils/Descriptions';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { Title } from '@/components/ui/utils/Titles';
import { ResetPasswordSchema, type ResetPasswordType } from '@/types/passwordSetup.types';

import type { JSX } from 'react';

export default function ResetPassword({ onNext }: { onNext: () => void }): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<ResetPasswordType>({ mode: 'all', resolver: zodResolver(ResetPasswordSchema) });

  const onSubmit = async (data: ResetPasswordType) => {
    try {
      reset();

      onNext();

      return data;
    } catch (error) {
      console.error('Form submission error:', error);

      return null;
    }
  };

  return (
    <div className="w-full">
      <div className="p-6 pb-4 flex flex-col ">
        <Title variant="h3">Reset Password</Title>
        <Description size="sm">Enter your email to recive a verification code</Description>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <InputComponent
          label="Email"
          placeholder="Enter your email"
          id="resetEmail"
          type="email"
          {...register('resetEmail')}
          error={errors.resetEmail}
          icon={
            <Icon
              name="Mail"
              size={16}
              color="#7a8799"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            />
          }
        />
        <Description className="mt-5">We'll send you an email with a verification code</Description>
        <Buttons
          disabled={isSubmitting || !isValid}
          variant="primary"
          loading={isSubmitting}
          type="submit"
          loadingChildren="Sending..."
          className="w-full mt-6"
        >
          Send OTP
        </Buttons>
      </form>
      <Buttons type="button" variant="ghost" className="mt-4 w-full">
        Skip for now
      </Buttons>
    </div>
  );
}
