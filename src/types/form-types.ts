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

export interface OrganizationType {
  companyName: string;
  companyType: string;
  companyEmail: string;
  CompanyPhoneNumber: string;
  companyWebsite?: string;
  companySize?: string;
  companyAddress: string;
  companyDescription?: string;
}

export interface DepartmentType {
  departmentNames: string[];
}
