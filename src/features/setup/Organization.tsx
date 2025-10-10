'use client';
import { type JSX, useMemo } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { Icon } from '@/components/Icons/Icon';
import { Textarea } from '@/components/ui/textarea';
import { Buttons } from '@/components/ui/utils/Buttons';
import { Description } from '@/components/ui/utils/Descriptions';
import { InputComponent } from '@/components/ui/utils/InputComponent';
import { LineBreak } from '@/components/ui/utils/LineBreak';
import { Selector } from '@/components/ui/utils/Selector';
import { Spinner } from '@/components/ui/utils/Spinner';
import { Title } from '@/components/ui/utils/Titles';

import type { OrganizationType } from '@/types/form-types';

export default function Organization({ onNext }: { onNext: () => void }): JSX.Element {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<OrganizationType>({ mode: 'all' });

  const onSubmit = (data: OrganizationType) => {
    console.log(data);
    onNext();
  };

  console.log(errors);

  const iconClass = 'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none';

  const companyTypes = useMemo(
    () => [
      'Private Limited',
      'Public Limited',
      'Partnership',
      'Sole Proprietorship',
      'Limited Liability Partnership',
      'Non-Profit Organization',
      'Government Organization',
      'Other',
    ],
    []
  );
  const companySizes = useMemo(
    () => [
      '1-10 employees',
      '11-50 employees',
      '51-200 employees',
      '201-1000 employees',
      '1000+ employees',
    ],
    []
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-6 gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Title className="text-start" variant="h3">
          Organization
        </Title>
        <Description className="text-start">Company details and information</Description>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-9 w-full">
          <InputComponent
            parentClassName="w-1/2"
            label="Company Name *"
            placeholder="Enter company name"
            id="companyName"
            type="text"
            {...register('companyName', {
              required: 'Company name is required',
            })}
            error={errors?.companyName}
            icon={<Icon name="Building" size={16} color="#7a8799" className={iconClass} />}
          />

          <Controller
            name="companyType"
            control={control}
            rules={{
              required: 'Company type is required',
              onBlur: value => companyTypes.includes(value) || 'Company type is required',
            }}
            render={({ field }) => (
              <Selector
                className="w-1/2"
                {...field}
                placeholder="Select Company Type"
                options={companyTypes}
                id="companyType"
                label="Company Type *"
                error={errors?.companyType}
              />
            )}
          />
        </div>

        <div className="flex gap-9 w-full">
          <InputComponent
            parentClassName="w-1/2"
            label="Company Email *"
            placeholder="company@example.com"
            id="companyEmail"
            type="email"
            {...register('companyEmail', {
              required: 'Company email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
            })}
            error={errors?.companyEmail}
            icon={<Icon name="Mail" size={16} color="#7a8799" className={iconClass} />}
          />

          <InputComponent
            label="Phone Number *"
            placeholder="+1 (234) 567 8901"
            id="CompanyPhoneNumber"
            type="text"
            parentClassName="w-1/2"
            {...register('CompanyPhoneNumber', {
              required: 'Company phone number is required',
            })}
            error={errors?.CompanyPhoneNumber}
            icon={<Icon name="Phone" size={16} color="#7a8799" className={iconClass} />}
          />
        </div>

        <div className="flex gap-9 w-full">
          <InputComponent
            label="Website"
            placeholder="https://www.company.com"
            id="companyWebsite"
            type="text"
            {...register('companyWebsite', {
              pattern: {
                value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/,
                message: 'Invalid URL',
              },
            })}
            parentClassName="w-1/2"
            error={errors?.companyWebsite}
            icon={<Icon name="Globe" size={16} color="#7a8799" className={iconClass} />}
          />

          <Controller
            name="companySize"
            control={control}
            render={({ field }) => (
              <Selector
                {...field}
                placeholder="Select Company size"
                options={companySizes}
                id="companySize"
                label="Company Size"
                className="w-1/2"
                icon={<Icon name="Users" size={16} color="#7a8799" className={iconClass} />}
              />
            )}
          />
        </div>

        <Textarea
          label="Company Address *"
          placeholder="Enter company address"
          id="companyAddress"
          {...register('companyAddress', {
            required: 'Company address is required',
          })}
          error={errors?.companyAddress}
          icon={
            <Icon
              name="MapPin"
              size={16}
              color="#7a8799"
              className={'absolute left-3 top-[10%]  w-4 h-4 pointer-events-none'}
            />
          }
        />

        <Textarea
          label="Company Description"
          placeholder="Brief description about your company"
          id="companyDescription"
          {...register('companyDescription')}
        />

        <LineBreak />

        {/* Buttons */}
        <div className="flex gap-4">
          <Buttons
            size="sm"
            className="w-1/2 font-medium "
            variant="secondary"
            type="button"
            onClick={onNext}
          >
            Skip This Step
          </Buttons>
          <Buttons
            size="sm"
            className="w-1/2 font-medium "
            variant="primary"
            type="submit"
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
    </form>
  );
}
