import SignInForm from '@/features/sign-in/SignInForm';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'features / SignInForm',
  component: SignInForm,
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
