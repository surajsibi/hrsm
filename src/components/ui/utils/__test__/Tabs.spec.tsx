import { render, screen } from '@testing-library/react';
import { Chip } from '../Chips';
import userEvent from '@testing-library/user-event';

describe('Tab', () => {
  it('should render the component', () => {
    render(<Chip>Tab</Chip>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Tab')).toBeInTheDocument();
    expect(screen.getByLabelText('Plus')).toBeInTheDocument();
  });
  it('should render with active state', () => {
    render(<Chip active>Tab</Chip>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText('X')).toBeInTheDocument();
  });
  it('should render with onClick', async () => {
    const onClick = jest.fn();
    render(<Chip onClick={onClick}>Tab</Chip>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
