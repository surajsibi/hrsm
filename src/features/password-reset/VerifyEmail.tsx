'use client';
import { useFormContext } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Description } from '@/components/ui/utils/Descriptions';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { Title } from '@/components/ui/utils/Titles';

import type { PasswordSetup } from '@/types/passwordSetup.types';
import type { JSX } from 'react';

export default function VerifyEmail({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useFormContext<PasswordSetup>();

  const onSubmit = async (data: PasswordSetup) => {
    try {
      reset();
      onNext();

      return data;
    } catch (error) {
      console.error('Form submission error:', error);

      return null; // don’t call onNext() on error
    }
  };

  return (
    <div>
      <div className="p-6 pb-4 flex flex-col ">
        <Title variant="h3">Verify Email</Title>
        <Description size="sm">Enter your verification code we sent to your email</Description>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <InputComponent
          maxLength={6}
          label="Veification Code"
          placeholder="Enter 6 digit code"
          id="otp"
          type="text"
          {...register('otp', {
            required: 'OTP is required',
            pattern: {
              value: /^[0-9]{6}$/,
              message: 'OTP must be 6 digits long',
            },
          })}
          error={errors.otp}
          icon={
            <Icon
              name="Shield"
              size={16}
              color="#7a8799"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            />
          }
        />
        <Description className="mt-5 text-left">Code sent to surajsibi2022@gmail.com</Description>
        <div className="flex justify-between mt-5 gap-5">
          <Buttons onClick={onPrev} type="button" variant="secondary" className="w-1/2">
            {
              <div className="flex items-center gap-2">
                <Icon name="ArrowLeft" size={16} /> Back
              </div>
            }
          </Buttons>
          <Buttons
            disabled={isSubmitting || !isValid}
            variant="primary"
            loading={isSubmitting}
            loadingChildren="Verifying..."
            className="w-1/2"
          >
            Verify OTP
          </Buttons>
        </div>
      </form>
    </div>
  );
}
