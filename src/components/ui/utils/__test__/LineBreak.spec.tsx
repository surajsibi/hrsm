import { render, screen } from '@testing-library/react';
import { LineBreak } from '../LineBreak';

describe('LineBreak', () => {
  it('should render the component', () => {
    render(<LineBreak />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('should render with custom classname', () => {
    render(<LineBreak className="w-24" />);
    expect(screen.getByRole('separator')).toHaveClass('w-24');
  });

  it('should render with ...props', () => {
    render(<LineBreak color="red" />);
    expect(screen.getByRole('separator')).toHaveAttribute('color', 'red');
  });
});
