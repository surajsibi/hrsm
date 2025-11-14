import { TenantOnBoardingForm } from '@/features/tenantOnBoarding/TenantOnBoardingForm';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'features /TenantOnBoarding / TenantOnBoardingForm',
  component: TenantOnBoardingForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
export const Default: StoryObj = {};
