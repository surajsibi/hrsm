import { render, screen } from '@testing-library/react';
import { InputComponent } from '../InputComponent';

describe('InputComponent', () => {
  it('should render the component', () => {
    render(<InputComponent placeholder="Input" />);
    expect(screen.getByPlaceholderText('Input')).toBeInTheDocument();
  });
  it('should render with custom classname', () => {
    render(<InputComponent className="w-24" placeholder="Input" />);
    expect(screen.getByPlaceholderText('Input')).toHaveClass('w-24');
  });
  it('should render with id', () => {
    render(<InputComponent id="input" placeholder="Input" />);
    expect(screen.getByPlaceholderText('Input')).toHaveAttribute('id', 'input');
  });
  it('should render with ...props', () => {
    render(<InputComponent color="red" placeholder="Input" />);
    expect(screen.getByPlaceholderText('Input')).toHaveAttribute('color', 'red');
  });
  it('should render with label', () => {
    render(<InputComponent label="Label" id="label" placeholder="Input" />);
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('Label')).toHaveAttribute('for', 'label');
  });
  it('should render with icon', () => {
    render(<InputComponent icon={<div>Icon</div>} placeholder="Input" />);
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });
});
