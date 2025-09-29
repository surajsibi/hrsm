import { TickLabel } from '@/components/ui/utils/TickLabel';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Utils/TickLabel',
  component: TickLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof TickLabel>;

export const Primary: Story = {
  args: {
    children: 'This is a management node (can have subordinates)',
  },
};
