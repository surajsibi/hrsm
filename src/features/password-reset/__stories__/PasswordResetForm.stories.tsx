import PasswordResetForm from '@/features/password-reset/PasswordResetForm';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'features / PasswordResetForm',
  component: PasswordResetForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
