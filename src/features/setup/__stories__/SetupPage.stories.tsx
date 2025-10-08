import { SetupPage } from '@/features/setup/SetupPage';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'features / SetupPage',
  component: SetupPage,
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
