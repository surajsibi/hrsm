import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('renders with default variant and size', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button', { name: /button/i });
    expect(button).toHaveClass('border-[#dfe2e7]');
    expect(button).toHaveClass('text-lg');
    expect(button).not.toBeDisabled();
  });

  it('should render with variants', () => {
    render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="default">Default</Button>
      </>
    );
    expect(screen.getByRole('button', { name: /primary/i })).toHaveClass('bg-gradient-primary');
    expect(screen.getByRole('button', { name: /secondary/i })).toHaveClass('bg-transparent');
    expect(screen.getByRole('button', { name: /ghost/i })).toHaveClass('border-none');
    expect(screen.getByRole('button', { name: /default/i })).toHaveClass('hover:text-blue-500');
  });

  it('should render with size', () => {
    render(
      <>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </>
    );
    expect(screen.getByRole('button', { name: /small/i })).toHaveClass('text-sm');
    expect(screen.getByRole('button', { name: /medium/i })).toHaveClass('text-base');
    expect(screen.getByRole('button', { name: /large/i })).toHaveClass('text-lg');
  });

  it('render with disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(screen.getByRole('button', { name: /disabled/i })).toHaveClass(
      'opacity-50 cursor-not-allowed'
    );
  });

  it('render with loading', () => {
    render(<Button loading>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('render with loadingChildren', async () => {
    render(
      <Button loadingChildren="Loading..." loading>
        Disabled
      </Button>
    );
    const button = screen.getByRole('button', { name: /Loading.../i });
    expect(button).toBeDisabled();
    expect(screen.getByRole('button', { name: /loading.../i })).toBeInTheDocument();
  });

  it('render with onClick', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Disabled</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
