import { AddShift } from '@/components/ui/utils/AddShift';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Utils/AddShift',
  component: AddShift,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AddShift>;

export const Primary: Story = {
  args: {},
};
