import { render, screen } from '@testing-library/react';
import { Label } from '../Label';

describe('Label', () => {
  it('should render the component', () => {
    render(<Label>Label</Label>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });
  it('should render with custom classname', () => {
    render(<Label className="w-24">Label</Label>);
    expect(screen.getByText('Label')).toHaveClass('w-24');
  });
  it('should render with ...props', () => {
    render(<Label color="red">Label</Label>);
    expect(screen.getByText('Label')).toHaveAttribute('color', 'red');
  });
});
