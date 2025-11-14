'use client';
import { type JSX, useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Controller, type FieldError, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Description } from '@/components/ui/Descriptions';
import { InputComponent } from '@/components/ui/InputComponent';
import { LineBreak } from '@/components/ui/LineBreak';
import { Selector } from '@/components/ui/Selector';
import { Spinner } from '@/components/ui/Spinner';
import { TextArea } from '@/components/ui/Textarea';
import { Title } from '@/components/ui/Titles';
import { OrganizationSchema, type OrganizationType } from '@/types/form-types';

const companyTypes = [
  'Private Limited',
  'Public Limited',
  'Partnership',
  'Sole Proprietorship',
  'Limited Liability Partnership',
  'Non-Profit Organization',
  'Government Organization',
  'Other',
];

const companySizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-1000 employees',
  '1000+ employees',
];

export function Organization({ onNext }: { onNext: () => void }): JSX.Element {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<OrganizationType>({ mode: 'all', resolver: zodResolver(OrganizationSchema) });

  const onSubmit = useCallback(
    (data: OrganizationType) => {
      console.log(data);
      onNext();
    },
    [onNext]
  );

  const image = watch('companyLogo');

  console.log(!!(image instanceof File), 'image instanceof File');
  const file = image instanceof File ? image : image?.[0];

  console.log(file, 'file instanceof File');

  const preview = file ? URL.createObjectURL(file) : null;

  console.log(preview);

  const [open, setOpen] = useState(false);

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
            {...register('companyName')}
            error={errors?.companyName}
            icon="Building"
          />

          <Controller
            name="companyType"
            control={control}
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

        <InputComponent
          parentClassName="w-[75%]"
          label="Brand Color Theme *"
          id="themeColor"
          type="color"
          {...register('themeColor', {
            onChange: e => e.target.value,
          })}
          icon="Palette"
          error={errors?.themeColor}
        />
        <div className="flex gap-9 w-full">
          <InputComponent
            parentClassName="w-1/2"
            label="Company Email *"
            placeholder="company@example.com"
            id="companyEmail"
            type="email"
            {...register('companyEmail')}
            error={errors?.companyEmail}
            icon="Mail"
          />

          <InputComponent
            label="Phone Number *"
            placeholder="+1 (234) 567 8901"
            id="companyPhoneNumber"
            type="text"
            parentClassName="w-1/2"
            {...register('companyPhoneNumber')}
            error={errors?.companyPhoneNumber}
            icon="Phone"
          />
        </div>

        <div className="flex gap-9 w-full">
          <InputComponent
            label="Website"
            placeholder="https://www.company.com"
            id="companyWebsite"
            type="text"
            {...register('companyWebsite')}
            parentClassName="w-1/2"
            error={errors?.companyWebsite}
            icon="Globe"
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
                icon="Users"
              />
            )}
          />
        </div>

        <div className="flex gap-9 w-full items-center ">
          <InputComponent
            parentClassName="w-full flex "
            label="Company Logo *"
            accept="image/*"
            id="logo"
            type="file"
            {...register('companyLogo', {
              onChange: e => e.target.files?.[0],
            })}
            className=" flex  file:bg-primary file:py-2 file:mr-6 file:text-sm file:font-medium file:px-2 mb-2 file:border-none file:rounded-md file:text-white "
            error={errors?.companyLogo as FieldError | undefined}
          />
          {preview && (
            <Image
              src={preview}
              alt="Company Logo"
              className="h-13 w-15 object-cover rounded-md mt-7"
              layout="fixed"
              width={128}
              height={128}
              unoptimized
              onClick={() => setOpen(true)}
            />
          )}
        </div>

        {open && preview && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center top-[50%] translate-y-[-50%] z-[999] backdrop-blur-sm w-[50vw] h-[50vh]">
            <Button
              size="md"
              className="absolute z-[1000] right-3 top-3 bg-white text-black  w-2 "
              onClick={() => setOpen(false)}
            >
              X
            </Button>
            <div className="relative ">
              <Image
                src={preview}
                alt="Large Company Logo"
                width={500}
                height={500}
                className="rounded-xl object-contain max-w-[25vw] max-h-[25vh]"
                unoptimized
              />
            </div>
          </div>
        )}

        <TextArea
          label="Company Address *"
          placeholder="Enter company address"
          id="companyAddress"
          {...register('companyAddress')}
          error={errors?.companyAddress}
          icon="MapPin"
        />

        <TextArea
          label="Company Description"
          placeholder="Brief description about your company"
          id="companyDescription"
          {...register('companyDescription')}
        />

        <LineBreak />

        {/* Button */}
        <div className="flex gap-4">
          <Button
            size="sm"
            className="w-1/2 font-medium "
            variant="secondary"
            type="button"
            onClick={onNext}
          >
            Skip This Step
          </Button>
          <Button
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
          </Button>
        </div>
      </div>
    </form>
  );
}
