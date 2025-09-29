import { render, screen } from '@testing-library/react';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('should render the component', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  it('should render with size', () => {
    render(<Spinner size="lg" />);
    const child = screen.getByRole('status').firstChild as HTMLElement;
    expect(child).toHaveClass('w-8 h-8');
  });
  it('should render with color', () => {
    render(<Spinner color="border-t-red-500" />);
    const child = screen.getByRole('status').firstChild as HTMLElement;
    expect(child).toHaveClass('border-t-red-500');
  });
});
