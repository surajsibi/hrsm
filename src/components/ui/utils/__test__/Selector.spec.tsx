import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Selector } from '../Selector';

describe('Selector', () => {
  const options = ['Apple', 'Banana', 'Orange'];

  it('renders with placeholder by default', () => {
    render(<Selector options={options} placeholder="Choose a fruit" />);
    expect(screen.getByRole('button', { name: /choose a fruit/i })).toBeInTheDocument();
  });

  it('renders with children', () => {
    render(
      <Selector options={options} placeholder="Pick">
        <span>🍎</span>
      </Selector>
    );
    expect(screen.getByText('🍎')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pick/i })).toBeInTheDocument();
  });

  it('opens dropdown on click and shows options', async () => {
    render(<Selector options={options} placeholder="Pick" />);
    const button = screen.getByRole('button', { name: /pick/i });
    await userEvent.click(button);
    options.forEach(opt => {
      expect(screen.getByRole('option', { name: opt })).toBeInTheDocument();
    });
  });

  it('calls onChange when option is clicked', async () => {
    const handleChange = jest.fn();
    render(<Selector options={options} placeholder="Pick" onChange={handleChange} />);
    await userEvent.click(screen.getByRole('button', { name: /pick/i }));
    await userEvent.click(screen.getByRole('option', { name: /banana/i }));
    expect(handleChange).toHaveBeenCalledWith('Banana');
  });

  it('closes dropdown when Escape is pressed', async () => {
    render(<Selector options={options} placeholder="Pick" />);
    const button = screen.getByRole('button', { name: /pick/i });
    await userEvent.click(button);
    expect(screen.getByRole('listbox')).toBeVisible();

    await userEvent.type(button, '{escape}');
    expect(screen.getByRole('listbox')).toHaveClass('pointer-events-none');
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <Selector options={options} placeholder="Pick" />
        <button>Outside</button>
      </div>
    );

    const button = screen.getByRole('button', { name: /pick/i });
    await userEvent.click(button);
    expect(screen.getByRole('listbox')).toBeVisible();

    await userEvent.click(screen.getByText('Outside'));
    expect(screen.getByRole('listbox')).toHaveClass('pointer-events-none');
  });

  it('does not open when disabled', async () => {
    render(<Selector options={options} placeholder="Pick" disabled />);
    const button = screen.getByRole('button', { name: /pick/i });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(screen.getByRole('listbox')).toHaveClass('pointer-events-none');
  });
});
