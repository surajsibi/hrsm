import { render, screen } from '@testing-library/react';
import { Description } from '../Descriptions';

describe('Description', () => {
  it('should render the component', () => {
    render(<Description>Description</Description>);
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Description')).toHaveClass('text-center text-paragraph text-sm');
  });

  it('should render with custom classname', () => {
    render(<Description className="w-24">Description</Description>);
    expect(screen.getByText('Description')).toHaveClass('w-24');
  });

  it('should render with custom size', () => {
    render(<Description size="lg">Description</Description>);
    expect(screen.getByText('Description')).toHaveClass('text-lg');
  });
  it('should render with ...props', () => {
    render(<Description color="red">Description</Description>);
    expect(screen.getByText('Description')).toHaveAttribute('color', 'red');
  });
});
