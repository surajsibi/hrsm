import { Day } from '@/components/ui/utils/Day';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Utils/Days',
  component: Day,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Day>;

export const Primary: Story = {
  args: {
    children: 'Monday',
    isActive: true,
  },
};
