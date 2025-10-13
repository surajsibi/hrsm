import { z } from 'zod';

export const EmployeeDetail = z.object({
  firstName: z
    .string()
    .min(3, 'firstName')
    .refine((value: string) => value, { message: 'firstname required' }),
  lastName: z
    .string()
    .min(3, ' LastName')
    .refine((value: string) => value, { message: 'lastname required' }),
  email: z.string().email('Invalid email address'),
  contactnumber: z.string().max(10, ' invalid number'),
  username: z
    .string()
    .min(3, 'User Name')
    .refine((value: string) => value, { message: 'UserName required' }),
  employeeid: z.string().max(14, 'invalid EmployeeId'),
  address: z.string().refine((value: string) => value, { message: 'addressline-1 required' }),
  designation: z.string().array(),
  accountnumber: z.string().max(14, 'invalid AccountNumber'),
  bankname: z
    .string()
    .min(3, ' BankName')
    .refine((value: string) => value, { message: 'BankName required' }),
  branchname: z
    .string()
    .min(3, ' BranchName')
    .refine((value: string) => value, { message: 'BranchName required' }),
  employeephoto: z.instanceof(File).array(),
  joiningdate: z.date(),
  accountholdername: z
    .string()
    .min(3, ' AccountHolderName')
    .refine((value: string) => value, {
      message: 'AccountHolderName required',
    }),
});

export const OrganizationSchema = z.object({
  companyName: z.string().min(1, 'Company Name is required'),
  companyType: z.preprocess(
    val => val ?? '',
    z.string().min(1, 'Company Type is required')
  ) as unknown as z.ZodString,
  companyEmail: z
    .string()
    .min(1, 'Company Email is required')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
  CompanyPhoneNumber: z.string().min(1, 'Company Phone Number is required'),
  companyWebsite: z.preprocess(
    val => (val === '' ? undefined : val),
    z
      .string()
      .regex(/^(http|https):\/\/[^\s]+$/, 'Invalid website URL')
      .optional()
  ) as unknown as z.ZodString,

  companySize: z.string().optional(),
  companyAddress: z.string().min(1, 'Company Address is required'),
  companyDescription: z.string().optional(),
});

export const DepartmentSchema = z.object({
  departmentNames: z.array(z.string()).optional(),
});

export const DesignationSchema = z.object({
  designation: z.record(z.string(), z.array(z.string())).optional(),
});

export type OrganizationType = z.infer<typeof OrganizationSchema>;

export type DepartmentType = z.infer<typeof DepartmentSchema>;

export type DesignationType = z.infer<typeof DesignationSchema>;
export interface ShiftType {
  title?: string;
  workType: string;
  startingTime: string;
  endingTime: string;
  days: string[];
  workingHours: string;
  shiftTracking: boolean;
  rotationalShifts: boolean;
}

export interface IShiftList {
  ShiftList: ShiftType[];
}

export interface IUsers {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  address?: string;
  isOnProbation: boolean;
  department?: string;
  designation?: string;
  userRole?: string;
  password?: string;
  probationStartDate?: string;
  probationEndDate?: string;
}
export interface UserList {
  userList: IUsers[];
}
