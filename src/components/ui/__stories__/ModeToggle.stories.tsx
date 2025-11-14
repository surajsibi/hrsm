import { ModeToggle } from '@/components/ModeToggle';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Utils/ModeToggle',
  component: ModeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'hello',
  },
};
