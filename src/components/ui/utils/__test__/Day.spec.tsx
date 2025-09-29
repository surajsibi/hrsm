import { render, screen } from '@testing-library/react';
import { Day } from '../Day';
import userEvent from '@testing-library/user-event';

describe('Day', () => {
  it('should render the component', () => {
    render(<Day>Day</Day>);
    expect(screen.getByRole('button', { name: /day/i })).toBeInTheDocument();
  });

  it('should render with is active true', () => {
    render(<Day isActive>Day</Day>);
    expect(screen.getByRole('button', { name: /day/i })).toHaveClass(
      'bg-[#3c83f6] text-white hover:text-white'
    );
  });
  it('render with custom classname', () => {
    render(<Day className="w-24">Day</Day>);
    expect(screen.getByRole('button', { name: /day/i })).toHaveClass('w-24');
  });
  it('render with onClick', async () => {
    const onClick = jest.fn();
    render(<Day onClick={onClick}>Day</Day>);
    await userEvent.click(screen.getByRole('button', { name: /day/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
