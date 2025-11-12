import { render, screen } from '@testing-library/react';
import { TextArea } from '@/components/ui/Textarea';

describe('TextArea', () => {
  it('should render the component', () => {
    render(<TextArea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('should render with icon', () => {
    render(<TextArea icon="ArrowLeft" />);
    expect(screen.getByLabelText('ArrowLeft')).toBeInTheDocument();
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
