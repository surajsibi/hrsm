import { z } from 'zod';

export interface PasswordSetup {
  resetEmail: string;
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const ResetPasswordSchema = z.object({
  resetEmail: z
    .string()
    .min(1, 'Email is required')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
});

export const VerifyEmailSchema = z.object({
  otp: z
    .string()
    .min(6, 'OTP should be at least 6 characters')
    .regex(/^\d+$/, 'OTP should be numeric'),
});

export const SetNewPasswordSchema = z
  .object({
    newPassword: z.string().min(1, 'Password is required'),
    confirmNewPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

// Combined type (useful for full data)
export type PasswordSetupType = z.infer<typeof ResetPasswordSchema> &
  z.infer<typeof VerifyEmailSchema> &
  z.infer<typeof SetNewPasswordSchema>;

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
export type VerifyEmailType = z.infer<typeof VerifyEmailSchema>;
export type SetNewPasswordType = z.infer<typeof SetNewPasswordSchema>;
