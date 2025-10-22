import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Shifts from '@/features/setup/Shifts';

jest.mock('@/components/ui/utils/AddShift', () => ({
  AddShift: ({ title, handleAddShift, disabled }: never) => (
    <div data-testid={`mock-addshift-${title}`}>
      <h3>{title}</h3>
      <button
        data-testid={`mock-addshift-button-${title}`}
        disabled={disabled}
        onClick={handleAddShift}
      >
        Add Shift
      </button>
    </div>
  ),
}));

describe('features / setup / Shifts', () => {
  const ShiftSetup = (props = {}) => {
    const defaultProps = {
      onNext: jest.fn(),
      onPrev: jest.fn(),
    };

    render(<Shifts {...defaultProps} {...props} />);

    const quickDayShiftButton = screen.getByTestId('mock-addshift-button-Day Shift');
    const quickNightShiftButton = screen.getByTestId('mock-addshift-button-Night Shift');
    const addCustomShiftInput = screen.getByRole('textbox', { name: /Shift Name/i });
    const workTypeDropDown = screen.getByRole('combobox', { name: /Work Type/i });
    const checkInTimeInput = screen.getByLabelText(/Check-in Time/i);
    const checkOutTimeInput = screen.getByLabelText(/Check-out Time/i);
    const mondayButton = screen.getByRole('button', { name: 'Monday' });
    const shiftTrackingButton = screen.getByRole('button', { name: 'Enable shift tracking' });
    const rotationalShiftButton = screen.getByRole('button', { name: 'Rotational shift' });
    const addShiftButton = screen.getByTestId('add-shift');
    const skipButton = screen.getByRole('button', { name: 'Skip This Step' });
    const prevButton = screen.getByRole('button', { name: 'Previous Step' });
    const continueButton = screen.getByRole('button', { name: 'Continue' });

    return {
      quickDayShiftButton,
      quickNightShiftButton,
      addCustomShiftInput,
      workTypeDropDown,
      checkInTimeInput,
      checkOutTimeInput,
      mondayButton,
      shiftTrackingButton,
      rotationalShiftButton,
      addShiftButton,
      skipButton,
      prevButton,
      continueButton,
    };
  };

  it('render all ui element correctly', () => {
    const {
      quickDayShiftButton,
      quickNightShiftButton,
      addCustomShiftInput,
      workTypeDropDown,
      checkInTimeInput,
      checkOutTimeInput,
      mondayButton,
      shiftTrackingButton,
      rotationalShiftButton,
      addShiftButton,
      skipButton,
      prevButton,
      continueButton,
    } = ShiftSetup();

    expect(screen.getByRole('heading', { name: 'Shifts', level: 3 })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Quick Add Shift Templates', level: 3 })
    ).toBeInTheDocument();

    expect(screen.getByTestId('mock-addshift-Day Shift')).toBeInTheDocument();

    expect(quickDayShiftButton).toBeInTheDocument();
    expect(quickNightShiftButton).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Create Custom Shift' })).toBeInTheDocument();

    expect(addCustomShiftInput).toBeInTheDocument();
    expect(workTypeDropDown).toBeInTheDocument();
    expect(checkInTimeInput).toBeInTheDocument();
    expect(checkOutTimeInput).toBeInTheDocument();
    expect(mondayButton).toBeInTheDocument();
    expect(shiftTrackingButton).toBeInTheDocument();
    expect(rotationalShiftButton).toBeInTheDocument();
    expect(addShiftButton).toBeInTheDocument();
    expect(skipButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();

    expect(screen.getAllByRole('separator')).toHaveLength(2);
  });

  it('add and remove qucik shifts', async () => {
    const { quickDayShiftButton, quickNightShiftButton } = ShiftSetup();

    expect(quickDayShiftButton).toBeInTheDocument();
    expect(quickNightShiftButton).toBeInTheDocument();
    await userEvent.click(quickDayShiftButton);

    expect(quickDayShiftButton).toBeDisabled();
    expect(screen.getByRole('heading', { name: 'Added Shifts', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Day Shift/i, level: 1 })).toBeInTheDocument();

    await userEvent.click(quickNightShiftButton);

    expect(quickNightShiftButton).toBeDisabled();
    expect(screen.getByRole('heading', { name: /Night Shift/i, level: 1 })).toBeInTheDocument();

    const deleteShiftButton = screen.getAllByRole('button', { name: 'Delete section' });

    expect(deleteShiftButton).toHaveLength(2);

    await userEvent.click(deleteShiftButton[0]);

    expect(screen.queryByRole('heading', { name: /Day Shift/i, level: 1 })).not.toBeInTheDocument();

    await userEvent.click(deleteShiftButton[1]);

    expect(
      screen.queryByRole('heading', { name: /Night Shift/i, level: 1 })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: 'Added Shifts', level: 3 })
    ).not.toBeInTheDocument();
  });

  it('add custom shift', async () => {
    const {
      addCustomShiftInput,
      workTypeDropDown,
      checkInTimeInput,
      checkOutTimeInput,
      addShiftButton,
    } = ShiftSetup();

    expect(addShiftButton).toBeDisabled();

    await userEvent.type(addCustomShiftInput, 'Custom Shift');
    await userEvent.click(workTypeDropDown);
    await userEvent.click(screen.getByRole('option', { name: 'Hybrid Work' }));
    await userEvent.type(checkInTimeInput, '10:00 AM');
    await userEvent.type(checkOutTimeInput, '06:00 PM');

    expect(addShiftButton).toBeEnabled();

    await userEvent.click(addShiftButton);

    expect(screen.queryByText(/Hybrid Work /i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Added Shifts', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Custom Shift/i, level: 1 })).toBeInTheDocument();

    await userEvent.type(addCustomShiftInput, 'custom shift 2');
    await userEvent.click(workTypeDropDown);

    await userEvent.click(screen.getByRole('option', { name: 'Work From Home' }));

    await userEvent.type(checkInTimeInput, '10:00 AM');
    await userEvent.type(checkOutTimeInput, '07:00 PM');

    expect(addShiftButton).toBeEnabled();

    await userEvent.click(addShiftButton);

    expect(screen.queryByText(/Work From Home /i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /custom shift 2/i, level: 1 })).toBeInTheDocument();

    const deleteShiftButton = screen.getAllByRole('button', { name: 'Delete section' });

    expect(deleteShiftButton).toHaveLength(2);

    await userEvent.click(deleteShiftButton[0]);

    expect(
      screen.queryByRole('heading', { name: 'Custom Shift', level: 1 })
    ).not.toBeInTheDocument();

    await userEvent.click(deleteShiftButton[1]);

    expect(
      screen.queryByRole('heading', { name: 'custom shift 2', level: 1 })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: 'Added Shifts', level: 3 })
    ).not.toBeInTheDocument();
  });

  it('skip, continue and previous button works correctly', async () => {
    const onNext = jest.fn();
    const onPrev = jest.fn();
    const { skipButton, continueButton, prevButton } = ShiftSetup({ onNext, onPrev });

    await userEvent.click(skipButton);
    expect(onNext).toHaveBeenCalledTimes(1);

    await userEvent.click(continueButton);
    expect(onNext).toHaveBeenCalledTimes(2);

    await userEvent.click(prevButton);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });
});
