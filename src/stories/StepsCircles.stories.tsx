import { StepsCircle } from '@/components/ui/utils/StepsCircle';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Utils/StepsCircle',
  component: StepsCircle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof StepsCircle>;

export const Priamry: Story = {
  args: {
    variant: 'primary',
    steps: [1, 2, 3, 4],
    currentStep: 1,
  },
};
export const Secondry: Story = {
  args: {
    steps: ['Organization', 'Departments', 'Designations', 'Shifts', 'Users', 'Complete'],
    currentStep: 1,
  },
};
