'use client';
import { type JSX } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { Textarea } from '@/components/ui/textarea';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Description } from '@/components/ui/utils/Descriptions';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { LineBreak } from '@/components/ui/utils/LineBreak';
import { Selector } from '@/components/ui/utils/Selector';
import { Spinner } from '@/components/ui/utils/Spinner';
import { Title } from '@/components/ui/utils/Titles';

import type { FormType } from '@/types/form-types';

export default function Organization({ onNext }: { onNext: () => void }): JSX.Element {
  const {
    register,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useFormContext<FormType>();

  return (
    <div className="flex flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Title variant="h3">Organization</Title>
        <Description>Company details and information</Description>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-9 w-full">
          <div className="w-1/2">
            <InputComponent
              label="Company Name *"
              placeholder="Enter company name"
              id="companyName"
              type="text"
              {...register('organization.companyName', {
                required: 'Company name is required',
              })}
              error={errors?.organization?.companyName}
              icon={
                <Icon
                  name="Shield"
                  size={16}
                  color="#7a8799"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                />
              }
            />
          </div>
          <div className="w-1/2">
            <Controller
              name="organization.companyType"
              control={control}
              rules={{ required: 'Company type is required' }}
              render={({ field }) => (
                <Selector
                  {...field}
                  placeholder="Select Company Type"
                  options={[
                    'Private Limited',
                    'Public Limited',
                    'Partnership',
                    'Sole Proprietorship',
                    'Limited Liability Partnership',
                    'Non-Profit Organization',
                    'Government Organization',
                    'Other',
                  ]}
                  id="companyType"
                  label="Company Type *"
                  error={errors?.organization?.companyType}
                  icon={
                    <Icon
                      name="Shield"
                      size={16}
                      color="#7a8799"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    />
                  }
                />
              )}
            />
          </div>
        </div>

        <div className="flex gap-9 w-full">
          <div className="w-1/2">
            <InputComponent
              label="Company Email *"
              placeholder="company@example.com"
              id="companyEmail"
              type="email"
              {...register('organization.companyEmail', {
                required: 'Company email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
              })}
              error={errors?.organization?.companyEmail}
              icon={
                <Icon
                  name="Mail"
                  size={16}
                  color="#7a8799"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                />
              }
            />
          </div>
          <div className="w-1/2">
            <InputComponent
              label="Phone Number *"
              placeholder="+1 (234) 567 8901"
              id="CompanyPhoneNumber"
              type="text"
              {...register('organization.CompanyPhoneNumber', {
                required: 'Company phone number is required',
              })}
              error={errors?.organization?.CompanyPhoneNumber}
              icon={
                <Icon
                  name="Phone"
                  size={16}
                  color="#7a8799"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                />
              }
            />
          </div>
        </div>

        <div className="flex gap-9 w-full">
          <div className="w-1/2">
            <InputComponent
              label="Website"
              placeholder="https://www.company.com"
              id="companyWebsite"
              type="text"
              {...register('organization.companyWebsite', {
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/,
                  message: 'Invalid URL',
                },
              })}
              error={errors?.organization?.companyWebsite}
              icon={
                <Icon
                  name="Globe"
                  size={16}
                  color="#7a8799"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                />
              }
            />
          </div>
          <div className="w-1/2">
            <Controller
              name="organization.companySize"
              control={control}
              render={({ field }) => (
                <Selector
                  {...field}
                  placeholder="Select Company size"
                  options={[
                    '1-10 employees',
                    '11-50 employees',
                    '51-200 employees',
                    '201-1000 employees',
                    '1000+ employees',
                  ]}
                  id="companySize"
                  label="Company Size"
                  icon={
                    <Icon
                      name="Users"
                      size={16}
                      color="#7a8799"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    />
                  }
                />
              )}
            />
          </div>
        </div>

        <div className="w-full">
          <Textarea
            label="Company Address *"
            placeholder="Enter company address"
            id="companyAddress"
            {...register('organization.companyAddress', {
              required: 'Company address is required',
            })}
            error={errors?.organization?.companyAddress}
            icon={
              <Icon
                name="MapPin"
                size={16}
                color="#7a8799"
                className="absolute left-3 top-[24%] -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
            }
          />
        </div>

        <div className="w-full">
          <Textarea
            label="Company Description"
            placeholder="Brief description about your company"
            id="companyDescription"
            {...register('organization.companyDescription')}
          />
        </div>

        <LineBreak />

        {/* Buttons */}
        <div className="flex gap-4">
          <Buttons className="w-1/2" variant="secondary" type="button" onClick={onNext}>
            Skip This Step
          </Buttons>
          <Buttons
            className="w-1/2"
            onClick={() => onNext()}
            variant="primary"
            type="button"
            disabled={isSubmitting || !isValid}
            loading={isSubmitting}
            loadingChildren={
              <span className="flex items-center gap-2">
                <Spinner /> Creating...
              </span>
            }
          >
            Create Organization
          </Buttons>
        </div>
      </div>
    </div>
  );
}
