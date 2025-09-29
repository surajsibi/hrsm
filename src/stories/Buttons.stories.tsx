import { Buttons } from '@/components/ui/utils/Buttons';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Utils/Buttons',
  component: Buttons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'ghost', 'default'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Buttons>;

export const Primary: Story = {
  args: {
    children: 'Sign in',
    variant: 'primary',
    loadingChildren: 'Loading...',
    loading: false,
    disabled: true,
  },
};
