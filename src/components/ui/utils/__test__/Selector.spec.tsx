import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Selector } from '@/components/ui/utils/Selector';

describe('components / ui / utils / Selector', () => {
  const SelectorSetup = () => {
    const options = ['Apple', 'Banana', 'Orange'];
    const onChange = jest.fn();
    render(
      <Selector
        placeholder="Choose a fruit"
        options={options}
        id="fruit-selector "
        onChange={onChange}
      />
    );

    const combobox = screen.getByRole('combobox');

    return { options, onChange, combobox };
  };

  it('renders combobox and opens dropdown', async () => {
    const { options, combobox } = SelectorSetup();

    expect(combobox).toBeInTheDocument();

    expect(combobox).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(combobox);

    options.forEach(option => {
      expect(screen.getByRole('option', { name: option })).toBeVisible();
    });
  });

  it('calls onChange when an option is clicked', async () => {
    const { options, combobox, onChange } = SelectorSetup();

    await userEvent.click(combobox);

    const bananaOption = screen.getByRole('option', { name: 'Banana' });
    await userEvent.click(bananaOption);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('Banana');

    expect(combobox).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports keyboard navigation', async () => {
    const { onChange, combobox } = SelectorSetup();

    combobox.focus();

    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('option', { name: 'Apple' })).toBeVisible();

    await userEvent.keyboard('{ArrowDown}');

    await userEvent.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith('Banana');
  });
});
