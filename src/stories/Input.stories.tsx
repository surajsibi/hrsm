import { Icon } from '@/components/Icons/Icon';
import { InputComponent } from '@/components/ui/utils/InputComponent';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Utils/Input',
  component: InputComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof InputComponent>;

export const Input: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    id: 'id',
    icon: (
      <Icon
        name="Briefcase"
        color="#7a8799"
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 "
      />
    ),
  },
};
