import { render, screen } from '@testing-library/react';
import { Note } from '../Note';

describe('Note', () => {
  it('should render the component', () => {
    render(<Note>Label</Note>);
    expect(screen.getByText('Label')).toBeInTheDocument();
  });
  it('should render with custom classname', () => {
    const { container } = render(<Note className="w-24">Label</Note>);
    const note = container.firstChild as HTMLElement;
    expect(note).toHaveClass('w-24');
  });

  it('should render with ...props', () => {
    const { container } = render(<Note color="red">Label</Note>);
    const note = container.firstChild as HTMLElement;
    expect(note).toHaveAttribute('color', 'red');
  });
});
