import { Note } from '@/components/ui/utils/Note';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Utils/Note',
  component: Note,
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
    children:
      ' Designations define job roles within departments. You can create hierarchical structures by setting reporting relationships. Management nodes can have subordinates.',
  },
};
