'use client';
import { type JSX, useCallback, useEffect, useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Controller, useController, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Description } from '@/components/ui/Descriptions';
import { InputComponent } from '@/components/ui/InputComponent';
import { LineBreak } from '@/components/ui/LineBreak';
import { Selector } from '@/components/ui/Selector';
import { Spinner } from '@/components/ui/Spinner';
import { TextArea } from '@/components/ui/Textarea';
import { Title } from '@/components/ui/Titles';
import { useAuthStore } from '@/store/auth.store';
import { OrganizationSchema, type OrganizationType } from '@/types/form-types';

const COMPANY_TYPES = [
  'Private Limited',
  'Public Limited',
  'Partnership',
  'Sole Proprietorship',
  'Limited Liability Partnership',
  'Non-Profit Organization',
  'Government Organization',
  'Other',
] as string[];

const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-1000 employees',
  '1000+ employees',
] as string[];

export function Organization({ onNext }: { onNext: () => void }): JSX.Element {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<OrganizationType>({
    mode: 'all',
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      themeColor: '#367df6',
    },
  });

  const { setTheme } = useAuthStore();
  const themeColor = watch('themeColor');

  const companyTypes = useMemo(() => COMPANY_TYPES, []);
  const companySizes = useMemo(() => COMPANY_SIZES, []);

  const { field: logoField } = useController({
    name: 'companyLogo',
    control,
    defaultValue: undefined as unknown as FileList | undefined,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fileList = logoField.value as FileList | undefined;
    const file = fileList?.[0] ?? (logoField.value instanceof File ? logoField.value : undefined);

    if (!file) {
      setPreviewUrl(null);

      return;
    }
    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(url);
  }, [logoField.value]);

  const onSubmit = useCallback(
    (data: OrganizationType) => {
      //will be called for api latter or may be send to parent
      console.log('submit', data);
      onNext();
    },
    [onNext]
  );

  const handleColorChange = (color: string) => {
    setValue('themeColor', color);
    setTheme(color);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-6 gap-6">
      <div className="flex flex-col gap-2">
        <Title className="text-start" variant="h3">
          Organization
        </Title>
        <Description className="text-start">Company details and information</Description>
      </div>

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

        <TextArea
          label="Company Address *"
          placeholder="Enter company address"
          id="companyAddress"
          {...register('companyAddress')}
          error={errors?.companyAddress}
          icon="MapPin"
        />

        <div className="flex gap-9 w-full items-center ">
          <div className="flex gap-9 w-1/2 justify-between items-start">
            <input
              id="companyLogo"
              aria-label="Company Logo"
              type="file"
              accept="image/*"
              onChange={e => {
                logoField.onChange(e.target.files);
              }}
              className="file:bg-(--gradient-primary) file:py-2 file:mr-6 file:text-sm file:font-medium file:px-2 mb-2 file:border-none file:rounded-md file:text-white"
            />
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="Company Logo"
                className="h-13 w-15 object-cover rounded-md  "
                layout="fixed"
                width={128}
                height={128}
                unoptimized
                onClick={() => setModalOpen(true)}
              />
            )}
          </div>

          <div className="w-1/2 flex items-center justify-center  gap-4">
            <Controller
              control={control}
              name="themeColor"
              render={({ field }) => (
                <InputComponent
                  parentClassName="w-[70%]"
                  label="Brand Color Theme *"
                  id="themeColor"
                  type="color"
                  value={field.value}
                  onChange={e => {
                    field.onChange(e.target.value);
                    handleColorChange(e.target.value);
                  }}
                  icon="Palette"
                  iconMiddleClassName="justify-start"
                  className="py-3.5 rounded-lg"
                  error={errors?.themeColor}
                />
              )}
            />

            <div className="flex flex-col items-center justify-end border py-2 px-2 mt-[5%] w-[30%] rounded-md  gap-1">
              <span className="text-xs font-bold text-gray-500">{themeColor}</span>
            </div>
          </div>
        </div>

        {modalOpen && previewUrl && (
          <div className="fixed inset-0 bg-white/30 flex items-center justify-center z-999 backdrop-blur-sm">
            <Button
              size="md"
              className="absolute z-1000 right-3 top-3 bg-black text-white"
              onClick={() => setModalOpen(false)}
            >
              X
            </Button>
            <div className="relative">
              <Image
                src={previewUrl}
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
          label="Company Description"
          placeholder="Brief description about your company"
          id="companyDescription"
          {...register('companyDescription')}
        />

        <LineBreak />

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
