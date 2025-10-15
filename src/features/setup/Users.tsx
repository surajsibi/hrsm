import { type JSX, useCallback, useMemo, useState } from 'react';

import { useForm } from 'react-hook-form';

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

import type { IUsers, UserList } from '@/types/form-types';

export default function Users({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}): JSX.Element {
  const { handleSubmit } = useForm<UserList>();

  const roles = useMemo(
    () => ['EMPLOYEE', 'ADMIN', 'HR MANAGER', 'MANAGER', 'TEAM LEAD', 'INTERN'],
    []
  );

  const [departments] = useState<string[]>([]);
  const [designations] = useState<Record<string, string[]>>({});
  const [userList, setUserList] = useState<IUsers[]>([]);

  const defaultUser: IUsers = {
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

  const [currentUser, setCurrentUser] = useState<IUsers>({ ...defaultUser });

  const resetCurrentUser = useCallback(() => setCurrentUser({ ...defaultUser }), []);

  const handleDelete = useCallback((index: number) => {
    setUserList(prev => prev.filter((_, i) => i !== index));
  }, []);

  function generatePassword(length = 12): string {
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
  }
  const handleAddUser = useCallback(() => {
    const userWithPassword = {
      ...currentUser,
      password: currentUser.password?.trim() ?? generatePassword(),
    };

    setUserList(prev => [...prev, userWithPassword]);

    resetCurrentUser();
  }, [currentUser, resetCurrentUser]);

  const handleProbationToggle = useCallback(() => {
    setCurrentUser(prev => ({
      ...prev,
      isOnProbation: !prev.isOnProbation,
      probationStartDate: prev.isOnProbation ? new Date().toISOString().split('T')[0] : '',
      probationEndDate: '',
    }));
  }, []);

  function onSubmit() {
    console.log(userList);
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
              value={currentUser.firstName}
              onChange={e => setCurrentUser({ ...currentUser, firstName: e.target.value })}
              icon={<Icon name="User" />}
            />
          </div>
          <div className="w-1/2">
            <InputComponent
              label="Last Name *"
              placeholder="Enter last name"
              id="lastName"
              type="text"
              value={currentUser.lastName}
              onChange={e => setCurrentUser({ ...currentUser, lastName: e.target.value })}
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
              value={currentUser.emailAddress}
              onChange={e => setCurrentUser({ ...currentUser, emailAddress: e.target.value })}
              icon={<Icon name="Mail" />}
            />
          </div>
          <div className="w-1/2">
            <InputComponent
              label="Phone Number *"
              placeholder="+1 (555) 123-4567"
              id="phoneNumber"
              type="text"
              value={currentUser.phoneNumber}
              onChange={e => setCurrentUser({ ...currentUser, phoneNumber: e.target.value })}
              icon={<Icon name="Phone" />}
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
            value={currentUser.dateOfBirth}
            onChange={e => setCurrentUser({ ...currentUser, dateOfBirth: e.target.value })}
            icon={<Icon name="Calendar" />}
          />
        </div>
        <div className="w-1/2">
          <Selector
            value={currentUser.gender}
            onChange={val =>
              setCurrentUser({
                ...currentUser,
                gender: val as 'Male' | 'Female' | 'Other',
              })
            }
            placeholder="Select Gender"
            options={['Male', 'Female', 'Other']}
            id="gender"
            label="Gender"
          />
        </div>
      </div>
      <div className="w-full">
        <InputComponent
          label="Address "
          id="address"
          placeholder="Enter complete address"
          type="text"
          value={currentUser.address}
          onChange={e => setCurrentUser({ ...currentUser, address: e.target.value })}
          icon={<Icon name="MapPin" />}
        />
      </div>
      <Title className="text-md font-medium text-start" variant="h3">
        Work Information
      </Title>
      <div className="flex gap-9 w-full">
        <div className="w-1/2">
          <Selector
            value={currentUser.department}
            onChange={val => setCurrentUser({ ...currentUser, department: val })}
            placeholder="Select department"
            options={departments || []}
            id="department"
            label="Department"
          />
        </div>
        <div className="w-1/2">
          <Selector
            value={currentUser.designation}
            disabled={!currentUser.department}
            onChange={val => setCurrentUser({ ...currentUser, designation: val })}
            placeholder="Select designation"
            options={currentUser.department ? designations[currentUser.department] || [] : []}
            id="designation"
            label="Designation"
          />
        </div>
      </div>
      <div className="flex gap-9 w-full">
        <div className="w-1/2">
          <Selector
            placeholder="Select user role"
            value={currentUser.userRole}
            onChange={val => setCurrentUser({ ...currentUser, userRole: val })}
            options={roles}
            id="department"
            label="Department"
          />
        </div>
        <div className="w-1/2 flex  items-end justify-center gap-3">
          <InputComponent
            label="Password (Optional) "
            id="password"
            placeholder="Auto-generated if empty"
            type="text"
            value={currentUser.password}
            onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
          />
          <Buttons
            type="button"
            className="h-11.5"
            onClick={() => {
              const password = generatePassword();

              setCurrentUser({ ...currentUser, password });
            }}
            variant="default"
          >
            Generate
          </Buttons>
        </div>
      </div>
      <TickLabel
        className="w-fit justify-starts"
        checked={currentUser.isOnProbation}
        onChange={handleProbationToggle}
      >
        Employee is on probation period
      </TickLabel>

      {currentUser.isOnProbation && (
        <div className="flex gap-9 w-full">
          <div className="w-1/2">
            <InputComponent
              label="Probation Start Date"
              id="probationStartDate"
              type="date"
              value={currentUser.probationStartDate}
              onChange={e => setCurrentUser({ ...currentUser, probationStartDate: e.target.value })}
              icon={<Icon name="Calendar" />}
            />
          </div>
          <div className="w-1/2">
            <InputComponent
              label="Probation End Date "
              id="probationEndDate"
              type="date"
              className="appearance-none"
              value={currentUser.probationEndDate}
              onChange={e => setCurrentUser({ ...currentUser, probationEndDate: e.target.value })}
              icon={<Icon name="Calendar" />}
            />
          </div>
        </div>
      )}
      <Buttons
        className="w-fit"
        variant="primary"
        type="button"
        disabled={
          !currentUser.firstName ||
          !currentUser.lastName ||
          !currentUser.emailAddress ||
          !currentUser.phoneNumber
        }
        onClick={handleAddUser}
      >
        <div className="text-white flex justify-center items-center">
          <Icon name="Plus" size={16} color="white" variant="normal" />
          <span className="ml-2">Add User</span>
        </div>
      </Buttons>

      {userList?.length > 0 && (
        <div>
          <Title className="text-md font-medium text-start" variant="h3">
            Added Users
          </Title>
          <div className="shadow-md space-y-4 bg-white border border-border rounded-lg p-4 text-primary">
            {userList.map((user, i) => (
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
                  onDelete={() => handleDelete(i)}
                  icon={<Icon name="User" size={16} variant="normal" />}
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
