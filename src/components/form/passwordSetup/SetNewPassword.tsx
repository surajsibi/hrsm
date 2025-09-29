import { useFormContext } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Description } from '@/components/ui/utils/Descriptions';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { Title } from '@/components/ui/utils/Titles';

import type { PasswordSetup } from '@/types/passwordSetup.types';
import type { JSX } from 'react';

export default function SetNewPassword(): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useFormContext<PasswordSetup>();
  const newPassword = watch('newPassword');

  const onSubmit = async (data: PasswordSetup) => {
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
          {...register('newPassword', {
            required: 'Password is required',
          })}
          error={errors.newPassword}
          icon={
            <Icon
              name="Lock"
              size={16}
              color="#7a8799"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            />
          }
        />
        <InputComponent
          label="Confirm Password"
          placeholder="Confirm new password"
          id="newPassword"
          type="password"
          {...register('confirmNewPassword', {
            required: 'Confirm Password is required',
            validate: value => value === newPassword || 'Passwords do not match',
          })}
          error={errors.confirmNewPassword}
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
