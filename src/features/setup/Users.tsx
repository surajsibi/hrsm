import { type JSX, useCallback, useMemo } from 'react';

import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { AddedSection } from '@/components/ui/utils/AddSections';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Description } from '@/components/ui/utils/Descriptions';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { LineBreak } from '@/components/ui/utils/LineBreak';
import { Note } from '@/components/ui/utils/Note';
import { Selector } from '@/components/ui/utils/Selector';
import { TickLabel } from '@/components/ui/utils/TickLabel';
import { Title } from '@/components/ui/utils/Titles';

import type { IUserFormType, IUsers } from '@/types/form-types';

const ROLES = ['EMPLOYEE', 'ADMIN', 'HR MANAGER', 'MANAGER', 'TEAM LEAD', 'INTERN'];

const DEFAULT_USER: IUsers = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
  dateOfBirth: '',
  gender: 'Male',
  address: '',
  isOnProbation: false,
  department: '',
  designation: '',
  userRole: 'EMPLOYEE',
  password: '',
  probationStartDate: '',
  probationEndDate: '',
};

const generatePassword = (length = 12): string => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{};:,.<>?';
  const all = upper + lower + numbers + symbols;

  let newPassword = '';

  newPassword += upper[Math.floor(Math.random() * upper.length)];
  newPassword += lower[Math.floor(Math.random() * lower.length)];
  newPassword += numbers[Math.floor(Math.random() * numbers.length)];
  newPassword += symbols[Math.floor(Math.random() * symbols.length)];

  // eslint-disable-next-line no-restricted-syntax
  for (let i = newPassword.length; i < length; i++) {
    newPassword += all[Math.floor(Math.random() * all.length)];
  }

  return (
    newPassword
      // eslint-disable-next-line unicorn/prefer-spread
      .split('')
      // eslint-disable-next-line unicorn/no-array-sort
      .sort(() => Math.random() - 0.5)
      .join('')
  );
};

export function Users({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }): JSX.Element {
  const { register, handleSubmit, watch, setValue, control } = useForm<IUserFormType>({
    defaultValues: {
      currentUser: DEFAULT_USER,
      usersList: [],
    },
  });

  const {
    fields: users,
    append,
    remove,
  } = useFieldArray({
    name: 'usersList',
    control,
  });

  const currentUser = watch('currentUser');
  const isOnProbation = currentUser.isOnProbation;

  let departments;
  let designations;

  const handleAddUser = useCallback(() => {
    const userWithPassword = {
      ...currentUser,
      password: currentUser.password?.trim() === '' ? generatePassword() : currentUser.password,
    };

    append(userWithPassword);

    setValue('currentUser', DEFAULT_USER);
  }, [currentUser, append, setValue]);

  function onSubmit() {
    console.log(users);
    onNext();
  }

  const addedUserSection = useMemo(
    () =>
      users?.length > 0 && (
        <div>
          <Title className="text-md font-medium text-start" variant="h3">
            Added Users
          </Title>
          <div className="shadow-md space-y-4 bg-white border border-border rounded-lg p-4 text-primary">
            {users.map((user, i) => (
              <div key={i}>
                <AddedSection
                  title={`${user.firstName}  ${user.lastName}`}
                  description={
                    <span>
                      {`${user.emailAddress} • ${user.userRole}`}
                      {user.isOnProbation ? (
                        <span className="text-yellow"> • On Probation</span>
                      ) : (
                        ''
                      )}
                    </span>
                  }
                  onDelete={() => remove(i)}
                  icon="User"
                />
              </div>
            ))}
          </div>
        </div>
      ),
    [users, remove]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-6 pt-8 gap-6">
      <div className="flex flex-col gap-1 items-start">
        <Title variant="h3">Users</Title>
        <Description>Add team members</Description>
      </div>

      {/* Quick Add Templates */}
      <div className="flex flex-col gap-1 items-start">
        <Title className="text-md font-medium" variant="h3">
          Add Team Members
        </Title>
        <Description>Create user account for your team members</Description>
      </div>
      <Title className="text-md font-medium text-start" variant="h3">
        Personal Information
      </Title>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-9 w-full">
          <div className="w-1/2">
            <InputComponent
              label="First Name *"
              placeholder="Enter first name"
              id="userName"
              type="text"
              {...register('currentUser.firstName')}
              icon="User"
            />
          </div>
          <div className="w-1/2">
            <InputComponent
              label="Last Name *"
              placeholder="Enter last name"
              id="lastName"
              type="text"
              {...register('currentUser.lastName')}
            />
          </div>
        </div>

        <div className="flex gap-9 w-full">
          <div className="w-1/2">
            <InputComponent
              label="Email Address *"
              placeholder="user@company.com"
              id="email"
              type="email"
              {...register('currentUser.emailAddress')}
              icon="Mail"
            />
          </div>
          <div className="w-1/2">
            <InputComponent
              label="Phone Number *"
              placeholder="+1 (555) 123-4567"
              id="phoneNumber"
              type="text"
              {...register('currentUser.phoneNumber')}
              icon="Phone"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-9 w-full">
        <div className="w-1/2">
          <InputComponent
            label="Date of Birth "
            id="dateOfBirth"
            type="date"
            className="appearance-none"
            {...register('currentUser.dateOfBirth')}
            icon="Calendar"
          />
        </div>
        <div className="w-1/2">
          <Controller
            name="currentUser.gender"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                placeholder="Select Company Type"
                options={['Male', 'Female', 'Other']}
                id="gender"
                label="Gender"
              />
            )}
          />
        </div>
      </div>
      <div className="w-full">
        <InputComponent
          label="Address"
          id="address"
          placeholder="Enter complete address"
          type="text"
          {...register('currentUser.address')}
          icon="MapPin"
        />
      </div>
      <Title className="text-md font-medium text-start" variant="h3">
        Work Information
      </Title>
      <div className="flex gap-9 w-full">
        <div className="w-1/2">
          <Controller
            name="currentUser.department"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                placeholder="Select department"
                options={departments ?? []}
                id="department"
                label="Department"
              />
            )}
          />
        </div>
        <div className="w-1/2">
          <Controller
            name="currentUser.designation"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                disabled={!currentUser.department}
                placeholder="Select designation"
                options={
                  currentUser.department ? (designations?.[currentUser.department] ?? []) : []
                }
                id="designation"
                label="Designation"
              />
            )}
          />
        </div>
      </div>
      <div className="flex gap-9 w-full">
        <div className="w-1/2">
          <Controller
            name="currentUser.userRole"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                placeholder="Select user role"
                options={ROLES}
                id="userRole"
                label="User Role"
              />
            )}
          />
        </div>
        <div className="w-1/2 flex  items-end justify-center gap-3">
          <InputComponent
            label="Password (Optional) "
            id="password"
            placeholder="Auto-generated if empty"
            type="text"
            {...register('currentUser.password')}
          />

          <Buttons
            type="button"
            className="h-11.5"
            onClick={() => setValue('currentUser.password', generatePassword())}
            variant="default"
          >
            Generate
          </Buttons>
        </div>
      </div>

      <Controller
        name="currentUser.isOnProbation"
        control={control}
        render={({ field }) => (
          <TickLabel
            className="w-fit justify-starts"
            checked={field.value}
            onChange={() => field.onChange(!field.value)}
          >
            Employee is on probation period
          </TickLabel>
        )}
      />

      {isOnProbation && (
        <div className="flex gap-9 w-full">
          <div className="w-1/2">
            <InputComponent
              label="Probation Start Date"
              id="probationStartDate"
              type="date"
              {...register('currentUser.probationStartDate')}
              icon="Calendar"
            />
          </div>
          <div className="w-1/2">
            <InputComponent
              label="Probation End Date "
              id="probationEndDate"
              type="date"
              className="appearance-none"
              {...register('currentUser.probationEndDate')}
              icon="Calendar"
            />
          </div>
        </div>
      )}
      <Buttons
        className="w-fit"
        variant="primary"
        type="button"
        disabled={
          !watch('currentUser.firstName') ||
          !watch('currentUser.lastName') ||
          !watch('currentUser.emailAddress') ||
          !watch('currentUser.phoneNumber')
        }
        onClick={handleAddUser}
      >
        <div className="text-white flex justify-center items-center">
          <Icon name="Plus" size={16} color="white" variant="normal" />
          <span className="ml-2">Add User</span>
        </div>
      </Buttons>

      {addedUserSection}

      <Note>
        User accounts will be created with the provided information. If no password is specified, a
        secure password will be automatically generated. Users will receive login credentials via
        email
      </Note>
      <LineBreak />

      <div className="flex justify-between gap-4">
        <Buttons
          variant="secondary"
          type="button"
          size="sm"
          className="w-1/2 text-[#344256] font-medium"
          onClick={onNext}
        >
          Skip This Step
        </Buttons>
        <Buttons variant="primary" size="sm" type="submit" className="w-1/2 font-medium">
          <p className="flex items-center justify-center gap-4">
            <span className="font-semibold text-center">Complete Setup</span>
            <Icon name="ArrowRight" size={16} color="white" variant="normal" />
          </p>
        </Buttons>
      </div>

      <LineBreak />
      <div className="flex justify-start items-center gap-4 w-fit px-2">
        <Buttons
          onClick={onPrev}
          variant="secondary"
          type="button"
          size="sm"
          className="text-black font-medium"
        >
          <p className="flex items-center justify-center gap-4">
            <Icon name="ArrowLeft" size={16} variant="normal" />
            <span className="font-medium text-center">Previous Step</span>
          </p>
        </Buttons>
      </div>
    </form>
  );
}
