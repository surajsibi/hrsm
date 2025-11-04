import { type JSX, useCallback } from 'react';

import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { AddedSection } from '@/components/ui/AddSections';
import { Button } from '@/components/ui/Button';
import { Description } from '@/components/ui/Descriptions';
import { InputComponent } from '@/components/ui/InputComponent';
import { LineBreak } from '@/components/ui/LineBreak';
import { Note } from '@/components/ui/Note';
import { Selector } from '@/components/ui/Selector';
import { TickLabel } from '@/components/ui/TickLabel';
import { Title } from '@/components/ui/Titles';
import { generatePassword } from '@/utils/generateRandomPassword';

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

          <Button
            type="button"
            className="h-11.5"
            onClick={() => setValue('currentUser.password', generatePassword())}
            variant="default"
          >
            Generate
          </Button>
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
      <Button
        className="w-fit"
        size="md"
        variant="primary"
        type="button"
        disabled={
          !watch('currentUser.firstName') ||
          !watch('currentUser.lastName') ||
          !watch('currentUser.emailAddress') ||
          !watch('currentUser.phoneNumber')
        }
        onClick={handleAddUser}
        startIcon="Plus"
      >
        Add User
      </Button>

      {users?.length > 0 && (
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
      )}

      <Note>
        User accounts will be created with the provided information. If no password is specified, a
        secure password will be automatically generated. Users will receive login credentials via
        email
      </Note>
      <LineBreak />

      <div className="flex justify-between gap-4">
        <Button
          variant="secondary"
          type="button"
          size="sm"
          className="w-1/2 text-[#344256] font-medium"
          onClick={onNext}
        >
          Skip This Step
        </Button>
        <Button
          endIcon="ArrowRight"
          iconColor="white"
          variant="primary"
          size="sm"
          type="submit"
          className="w-1/2 font-medium"
        >
          Complete Setup
        </Button>
      </div>

      <LineBreak />
      <div className="flex justify-start items-center gap-4 w-fit px-2">
        <Button
          onClick={onPrev}
          variant="secondary"
          type="button"
          size="sm"
          className="text-black font-medium"
          startIcon="ArrowLeft"
        >
          Previous Step
        </Button>
      </div>
    </form>
  );
}
