import { render, screen } from '@testing-library/react';
import { Buttons } from '../Buttons';
import userEvent from '@testing-library/user-event';

describe('Buttons', () => {
  it('renders with default variant and size', () => {
    render(<Buttons>Button</Buttons>);
    const button = screen.getByRole('button', { name: /button/i });
    expect(button).toHaveClass('border-[#dfe2e7]');
    expect(button).toHaveClass('text-base');
    expect(button).not.toBeDisabled();
  });

  it('should render with variants', () => {
    render(
      <>
        <Buttons variant="primary">Primary</Buttons>
        <Buttons variant="secondary">Secondary</Buttons>
        <Buttons variant="ghost">Ghost</Buttons>
        <Buttons variant="default">Default</Buttons>
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
        <Buttons size="sm">Small</Buttons>
        <Buttons size="md">Medium</Buttons>
        <Buttons size="lg">Large</Buttons>
      </>
    );
    expect(screen.getByRole('button', { name: /small/i })).toHaveClass('text-sm');
    expect(screen.getByRole('button', { name: /medium/i })).toHaveClass('text-base');
    expect(screen.getByRole('button', { name: /large/i })).toHaveClass('text-lg');
  });

  it('render with disabled', () => {
    render(<Buttons disabled>Disabled</Buttons>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(screen.getByRole('button', { name: /disabled/i })).toHaveClass(
      'opacity-50 cursor-not-allowed'
    );
  });
  
  it('render with loading', () => {
    render(<Buttons loading>Disabled</Buttons>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('render with loadingChildren', async () => {
    render(
      <Buttons loadingChildren="Loading..." loading>
        Disabled
      </Buttons>
    );
    const button = screen.getByRole('button', { name: /Loading.../i });
    expect(button).toBeDisabled();
    expect(screen.getByRole('button', { name: /loading.../i })).toBeInTheDocument();
  });

  it('render with onClick', async () => {
    const onClick = jest.fn();
    render(<Buttons onClick={onClick}>Disabled</Buttons>);
    await userEvent.click(screen.getByRole('button'));
     expect(onClick).toHaveBeenCalledTimes(1);
  });
});
