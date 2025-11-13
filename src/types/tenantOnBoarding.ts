import { z } from 'zod';

export const TenantOnBoardingSchema = z
  .object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
    phoneNumber: z
      .string()
      .min(1, 'Phone Number is required')
      .regex(/^(\+91[\s-]?)?[0]?[6-9]\d{9}$/, 'Invalid phone number'),
    companyName: z.string().min(1, 'Company Name is required'),

    // Single field — behaves like a radio
    databaseType: z.enum(['shared', 'private', 'dedicated'], {
      error: 'Select a database type',
    }),

    // Private DB fields
    databaseHost: z.string().optional(),
    databasePort: z.string().optional(),
    databaseName: z.string().optional(),
    databaseUsername: z.string().optional(),
    databasePassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Private DB → all fields required
    if (data.databaseType === 'private') {
      const requiredFields = [
        ['databaseHost', data.databaseHost],
        ['databasePort', data.databasePort],
        ['databaseName', data.databaseName],
        ['databaseUsername', data.databaseUsername],
        ['databasePassword', data.databasePassword],
      ];

      for (const [field, value] of requiredFields) {
        if (!value?.trim()) {
          ctx.addIssue({
            path: field ? [field as PropertyKey] : [],
            message: `${field?.replace('database', 'Database ')} is required`,
            code: 'custom',
          });
        }
      }
    }
  });

export type TenantOnBoardingType = z.infer<typeof TenantOnBoardingSchema>;
