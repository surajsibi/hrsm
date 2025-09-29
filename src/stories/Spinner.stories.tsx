import { Spinner } from '@/components/ui/utils/Spinner';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Utils/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};
