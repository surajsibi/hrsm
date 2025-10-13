import { z } from 'zod';

export const SignInFormSchema = z.object({
  tenantCode: z.string().optional(),
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
  password: z
    .string()
    .refine((value: string) => value, { message: 'Password is required' })
    .min(6, 'Password should be at least 6 characters'),
});
export type SignInFormType = z.infer<typeof SignInFormSchema>;
