import { TextArea } from '@/components/ui/TextArea';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Utils/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};
