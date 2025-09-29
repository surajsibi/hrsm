import { render, screen } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
  it('should render the component', () => {
    render(<Input placeholder="Input" />);
    expect(screen.getByPlaceholderText('Input')).toBeInTheDocument();
  });
  it('should render with custom classname', () => {
    render(<Input className="w-24" placeholder="Input" />);
    expect(screen.getByPlaceholderText('Input')).toHaveClass('w-24');
  });
  it('should render with id', () => {
    render(<Input id="input" placeholder="Input" />);
    expect(screen.getByPlaceholderText('Input')).toHaveAttribute('id', 'input');
  });
  it('should render with ...props', () => {
    render(<Input color="red" placeholder="Input" />);
    expect(screen.getByPlaceholderText('Input')).toHaveAttribute('color', 'red');
  });
});
