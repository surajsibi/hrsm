import { Description } from '@/components/ui/utils/Descriptions';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Utils/Description',
  component: Description,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Description>;

export const Primary: Story = {
  args: {
    children: 'Sign in',
    size: 'sm',
  },
};
export const Default: Story = {
  args: {
    children: 'Sign in',
  },
};
