import { Label } from '@/components/ui/label';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'utils/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};
