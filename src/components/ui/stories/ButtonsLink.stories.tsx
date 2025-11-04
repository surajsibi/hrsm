import { Button } from '@/components/ui/Button';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta = {
  title: 'Utils/ButtonLink',
  component: Button.Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'ghost', 'default'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    loading: {
      control: 'boolean',
    },
    loadingChildren: {
      control: 'text',
    },
    href: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Sign in',
    variant: 'primary',
    href: 'https://next-app-i18n-starter.vercel.app',
    loadingChildren: 'Loading...',
    loading: false,
  },
};
