import { Icon } from '@/components/Icons/Icon';
import { HeaderLogo } from '@/components/ui/utils/HeaderLogos';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Utils/HeaderLogos',
  component: HeaderLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof HeaderLogo>;

export const Default: Story = {
  args: {
    children: 'Sign in',
    icon: <Icon name="Building2" color="#fff" size={25} />,
  },
};
