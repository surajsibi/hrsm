import { render, screen } from '@testing-library/react';
import { TextArea } from '@/components/ui/TextArea';

describe('TextArea', () => {
  it('should render the component', () => {
    render(<TextArea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('should render with icon', () => {
    render(<TextArea icon={<div>Icon</div>} />);
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });
  it('should render with custom classname', () => {
    render(<TextArea className="w-24" />);
    expect(screen.getByRole('textbox')).toHaveClass('w-24');
  });
  it('should render with ...props', () => {
    render(<TextArea color="red" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('color', 'red');
  });
  it('should render with placeholder', () => {
    render(<TextArea placeholder="Placeholder" />);
    expect(screen.getByPlaceholderText('Placeholder')).toBeInTheDocument();
  });
});
