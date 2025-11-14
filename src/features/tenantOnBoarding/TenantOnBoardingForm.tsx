'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Icon, type IconName } from '@/components/Icons/Icon';
import { Button } from '@/components/ui/Button';
import { Description } from '@/components/ui/Descriptions';
import { InputComponent } from '@/components/ui/InputComponent';
import { LineBreak } from '@/components/ui/LineBreak';
import { Title } from '@/components/ui/Titles';
import { TenantOnBoardingSchema, type TenantOnBoardingType } from '@/types/tenantOnBoarding';
import { cn } from '@/utils';

import type { JSX } from 'react';

const databaseTypeOptions: {
  value: TenantOnBoardingType['databaseType'];
  label: string;
  description: string;
  icon: IconName;
}[] = [
  {
    value: 'shared',
    label: 'Shared Database',
    description: 'Managed multi-tenant environment with automated updates and monitoring.',
    icon: 'Users',
  },
  {
    value: 'private',
    label: 'Private Database',
    description: 'Bring your own database credentials and retain full control of data policies.',
    icon: 'KeyRound',
  },
  {
    value: 'dedicated',
    label: 'Dedicated Database',
    description: 'Isolated infrastructure tuned for performance and enterprise compliance.',
    icon: 'Database',
  },
];

export function TenantOnBoardingForm(): JSX.Element {
  const {
    register,
    control,
    watch,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm<TenantOnBoardingType>({ mode: 'all', resolver: zodResolver(TenantOnBoardingSchema) });

  const databaseType = watch('databaseType');
  const showPrivateDatabaseSection = databaseType === 'private';

  const personalFields = [
    {
      name: 'firstName' as const,
      label: 'First Name *',
      placeholder: 'Enter first name',
      id: 'firstName',
      icon: 'User' as const,
      autoComplete: 'given-name',
    },
    {
      name: 'lastName' as const,
      label: 'Last Name *',
      placeholder: 'Enter last name',
      id: 'lastName',
      icon: 'User' as const,
      autoComplete: 'family-name',
    },
    {
      name: 'email' as const,
      label: 'Email Address *',
      placeholder: 'Enter work email',
      id: 'email',
      icon: 'Mail' as const,
      type: 'email',
      autoComplete: 'email',
    },
    {
      name: 'phoneNumber' as const,
      label: 'Phone Number *',
      placeholder: 'Enter phone number',
      id: 'phoneNumber',
      icon: 'Phone' as const,
      type: 'tel',
      autoComplete: 'tel',
    },
    {
      name: 'companyName' as const,
      label: 'Company Name *',
      placeholder: 'Enter company name',
      id: 'companyName',
      icon: 'Building2' as const,
      autoComplete: 'organization',
    },
  ];

  const privateDatabaseFields = [
    {
      name: 'databaseHost' as const,
      label: 'Database Host *',
      placeholder: 'e.g., localhost or 192.168.1.1',
      id: 'databaseHost',
      icon: 'Globe' as const,
    },
    {
      name: 'databasePort' as const,
      label: 'Database Port *',
      placeholder: 'e.g., 5432 or 3306',
      id: 'databasePort',
      icon: 'MapPin' as const,
    },
    {
      name: 'databaseName' as const,
      label: 'Database Name *',
      placeholder: 'e.g., hrms_production',
      id: 'databaseName',
      icon: 'Briefcase' as const,
    },
    {
      name: 'databaseUsername' as const,
      label: 'Database Username *',
      placeholder: 'Enter database username',
      id: 'databaseUsername',
      icon: 'User' as const,
    },
    {
      name: 'databasePassword' as const,
      label: 'Database Password *',
      placeholder: 'Enter database password',
      id: 'databasePassword',
      icon: 'Lock' as const,
      type: 'password',
      autoComplete: 'new-password',
    },
  ];

  const onSubmit = (data: TenantOnBoardingType) => {
    console.log(data);
  };

  return (
    <section className="mx-auto max-w-5xl space-y-6 pt-10">
      <header className="space-y-2 text-center md:text-left">
        <Title variant="h1" className="text-left text-3xl font-semibold leading-tight md:text-4xl">
          Welcome!
        </Title>
        <Description size="lg" className="text-left ">
          Complete your HRMS setup so we can personalise the workspace for your organisation.
        </Description>
      </header>
      <section className="mt-6 rounded-2xl border border-border bg-card/80 shadow-xl backdrop-blur-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 p-6 md:p-10">
          <section className="space-y-6">
            <div className="space-y-2">
              <Title variant="h2" className="text-left text-2xl">
                Primary Contact
              </Title>
              <Description size="md" className="text-left ">
                Please provide the details below so we can keep you informed about onboarding
                progress.
              </Description>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {personalFields.slice(0, 4).map(field => (
                <InputComponent
                  key={field.name}
                  parentClassName="w-full"
                  label={field.label}
                  placeholder={field.placeholder}
                  id={field.id}
                  type={field.type}
                  icon={field.icon}
                  autoComplete={field.autoComplete}
                  {...register(field.name)}
                  error={errors?.[field.name]}
                />
              ))}
            </div>
            <InputComponent
              parentClassName="w-full"
              label={personalFields[4].label}
              placeholder={personalFields[4].placeholder}
              id={personalFields[4].id}
              icon={personalFields[4].icon}
              autoComplete={personalFields[4].autoComplete}
              {...register(personalFields[4].name)}
              error={errors?.[personalFields[4].name]}
            />
          </section>

          <LineBreak className="bg-border/80" />

          <section className="space-y-6">
            <div className="flex flex-col gap-2">
              <Title variant="h2" className="text-left text-2xl">
                Database Setup
              </Title>
              <Description size="md" className="text-left ">
                Choose how you would like us to provision your HRMS database. You can change this
                choice during onboarding.
              </Description>
            </div>

            <Controller
              control={control}
              name="databaseType"
              render={({ field }) => (
                <div className="space-y-4">
                  <div
                    role="radiogroup"
                    aria-label="Database setup options"
                    className="grid gap-4 md:grid-cols-3"
                  >
                    {databaseTypeOptions.map(option => {
                      const isSelected = field.value === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => field.onChange(option.value)}
                          onBlur={field.onBlur}
                          className={cn(
                            'group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card/70 p-4 text-left transition-all duration-200',
                            'hover:border-primary/60 hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
                            isSelected && 'border-primary bg-primary/10 ring-2 ring-primary/40'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="rounded-xl bg-primary/15 p-2 text-primary transition-all group-hover:bg-primary/20">
                              <Icon
                                name={option.icon}
                                variant="normal"
                                size={18}
                                color="currentColor"
                                className="text-primary"
                              />
                            </span>
                            {isSelected && (
                              <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-white">
                                Selected
                              </span>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Title variant="h4" className="text-left text-lg">
                              {option.label}
                            </Title>
                            <Description size="sm" className="text-left ">
                              {option.description}
                            </Description>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {errors.databaseType && (
                    <Description size="sm" className="text-left text-destructive">
                      *{errors.databaseType.message}*
                    </Description>
                  )}
                </div>
              )}
            />

            {showPrivateDatabaseSection ? (
              <div className="space-y-4 rounded-2xl border border-dashed border-primary/50 bg-primary/5 p-6">
                <div className="space-y-2">
                  <Title variant="h3" className="text-left text-xl">
                    Private Database Credentials
                  </Title>
                  <Description size="sm" className="text-left ">
                    We will create a secure connection using the credentials you provide. Make sure
                    these details are accurate and have the required permissions.
                  </Description>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {privateDatabaseFields.map(field => (
                    <InputComponent
                      key={field.name}
                      parentClassName={cn(
                        'w-full',
                        field.name === 'databasePassword' && 'md:col-span-2'
                      )}
                      label={field.label}
                      placeholder={field.placeholder}
                      id={field.id}
                      type={field.type}
                      icon={field.icon}
                      autoComplete={field.autoComplete}
                      {...register(field.name)}
                      error={errors?.[field.name]}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-5">
                <Description size="sm" className="text-left ">
                  Selecting a private database will prompt you for credentials. Shared or dedicated
                  options are fully managed by our team—no extra setup required.
                </Description>
              </div>
            )}
          </section>

          <div className="flex flex-col gap-5">
            <Button
              disabled={isSubmitting || !isValid}
              size="lg"
              className="w-full md:w-auto"
              variant="primary"
              type="submit"
            >
              Complete Setup
            </Button>
            <Description size="sm" className="text-left px-2 ">
              You can always revisit onboarding settings later from your admin dashboard.
            </Description>
          </div>
        </form>
      </section>
    </section>
  );
}
