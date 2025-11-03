'use client';

import { type JSX, memo, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Buttons } from '@/components/ui/utils/Buttons';
import { Description } from '@/components/ui/utils/Descriptions';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { Title } from '@/components/ui/utils/Titles';
import { SetNewPasswordSchema, type SetNewPasswordType } from '@/types/passwordSetup.types';

function SetNewPassword(): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SetNewPasswordType>({ mode: 'all', resolver: zodResolver(SetNewPasswordSchema) });

  const router = useRouter();

  const onSubmit = useCallback(
    (data: SetNewPasswordType): void => {
      try {
        console.log(data);
        router.push('/setup');
      } catch (error) {
        console.error('Form submission error:', error);
      }
    },
    [reset, router]
  );

  return (
    <div className="">
      <div className="p-6 pb-4 flex flex-col ">
        <Title variant="h3">Set New Password</Title>
        <Description size="sm">Create a strong new password for your account</Description>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <InputComponent
          label="New Password"
          placeholder="Enter new password"
          id="newPassword"
          type="password"
          {...register('newPassword')}
          error={errors.newPassword}
          icon="Lock"
        />
        <InputComponent
          label="Confirm Password"
          placeholder="Confirm new password"
          id="confirmNewPassword"
          type="password"
          {...register('confirmNewPassword')}
          error={errors.confirmNewPassword}
          icon="Lock"
        />
        <Buttons
          variant="primary"
          disabled={isSubmitting || !isValid}
          loadingChildren="Updating..."
          loading={isSubmitting}
          className="w-full"
        >
          Update Password
        </Buttons>
      </form>
    </div>
  );
}

export default memo(SetNewPassword);
