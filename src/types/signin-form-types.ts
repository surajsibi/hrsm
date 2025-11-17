import { z } from 'zod';

export const SignInFormSchema = z.object({
  tenantCode: z.string().min(1, 'Tenant Code is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
  password: z
    .string()
    .refine((value: string) => value, { message: 'Password is required' })
    .min(1, 'Password is required'),
  image: z
    .any()
    .optional()
    .refine(
      file => file === undefined || file === null || file instanceof File || file?.[0] instanceof File,
      {
        message: 'Invalid file',
      }
    )
    .refine(
      file =>
        !file ||
        (file instanceof File && file.type.startsWith('image/')) ||
        (file?.[0] instanceof File && file?.[0].type.startsWith('image/')),
      {
        message: 'Only image files allowed',
      }
    )
    .refine(
      file =>
        !file ||
        (file instanceof File && file.size <= 10 * 1024 * 1024) ||
        (file?.[0] instanceof File && file?.[0].size <= 10 * 1024 * 1024),
      {
        message: 'Max file size is 10MB',
      }
    ),
});
export type SignInFormType = z.infer<typeof SignInFormSchema>;
