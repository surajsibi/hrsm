'use client';
import { type JSX, memo, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Description } from '@/components/ui/Descriptions';
import { InputComponent } from '@/components/ui/InputComponent';
import { Title } from '@/components/ui/Titles';
import { VerifyEmailSchema, type VerifyEmailType } from '@/types/passwordSetup.types';

function VerifyEmail({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<VerifyEmailType>({ mode: 'all', resolver: zodResolver(VerifyEmailSchema) });

  const onSubmit = useCallback(
    async (data: VerifyEmailType) => {
      try {
        reset();
        onNext();

        return data;
      } catch (error) {
        console.error('Form submission error:', error);

        return null; // don’t call onNext() on error
      }
    },
    [onNext, reset]
  );

  return (
    <div>
      <div className="p-6 pb-4 flex flex-col ">
        <Title variant="h3">Verify Email</Title>
        <Description size="sm">Enter your verification code we sent to your email</Description>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <InputComponent
          maxLength={6}
          label="Verification Code"
          placeholder="Enter 6 digit code"
          id="otp"
          type="text"
          {...register('otp')}
          error={errors.otp}
          icon="Shield"
        />
        <Description className="mt-5 text-left">Code sent to surajsibi2022@gmail.com</Description>
        <div className="flex justify-between mt-5 gap-5">
          <Button
            onClick={onPrev}
            type="button"
            variant="secondary"
            startIcon="ArrowLeft"
            className="w-1/2"
          >
            {<div className="flex items-center gap-2">Back</div>}
          </Button>
          <Button
            disabled={isSubmitting || !isValid}
            variant="primary"
            loading={isSubmitting}
            loadingChildren="Verifying..."
            className="w-1/2"
          >
            Verify OTP
          </Button>
        </div>
      </form>
    </div>
  );
}

export default memo(VerifyEmail);
