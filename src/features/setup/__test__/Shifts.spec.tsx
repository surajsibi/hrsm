import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Shifts } from '@/features/setup/Shifts';

describe('features / setup / Shifts', () => {
  const user = userEvent.setup();
  const ShiftSetup = (props = {}) => {
    const defaultProps = {
      onNext: jest.fn(),
      onPrev: jest.fn(),
    };

    render(<Shifts {...defaultProps} {...props} />);

    const quickDayShiftButton = screen.getByRole('button', { name: /Add Shift-Day Shift/i });
    const quickNightShiftButton = screen.getByRole('button', { name: /Add Shift-Night Shift/i });
    const addCustomShiftInput = screen.getByRole('textbox', { name: /Shift Name/i });
    const workTypeDropDown = screen.getByRole('combobox', { name: /Work Type/i });
    const checkInTimeInput = screen.getByLabelText(/Check-in Time/i);
    const checkOutTimeInput = screen.getByLabelText(/Check-out Time/i);
    const mondayButton = screen.getByRole('button', { name: /Monday/i });
    const shiftTrackingButton = screen.getByRole('button', { name: /Enable shift tracking/i });
    const rotationalShiftButton = screen.getByRole('button', { name: /Rotational shift/i });
    const addShiftButton = screen.getByRole('button', { name: /add custom shifts/i });
    const skipButton = screen.getByRole('button', { name: /Skip This Step/i });
    const prevButton = screen.getByRole('button', { name: /Previous Step/i });
    const continueButton = screen.getByRole('button', { name: /Continue/i });

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

    expect(screen.getByRole('heading', { name: 'Day Shift', level: 3 })).toBeInTheDocument();

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
    await user.click(quickDayShiftButton);

    expect(quickDayShiftButton).toBeDisabled();
    expect(screen.getByRole('heading', { name: 'Added Shifts', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Day Shift/i, level: 1 })).toBeInTheDocument();

    await user.click(quickNightShiftButton);

    expect(quickNightShiftButton).toBeDisabled();
    expect(screen.getByRole('heading', { name: /Night Shift/i, level: 1 })).toBeInTheDocument();

    const deleteShiftButton = screen.getAllByRole('button', { name: 'Delete section' });

    expect(deleteShiftButton).toHaveLength(2);

    await user.click(deleteShiftButton[0]);

    expect(screen.queryByRole('heading', { name: /Day Shift/i, level: 1 })).not.toBeInTheDocument();

    await user.click(deleteShiftButton[1]);

    expect(
      screen.queryByRole('heading', { name: /Night Shift/i, level: 1 })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: 'Added Shifts', level: 3 })
    ).not.toBeInTheDocument();
  });

  it('add custom shift', async () => {
    const { addCustomShiftInput, workTypeDropDown, addShiftButton } = ShiftSetup();

    expect(addShiftButton).toBeDisabled();

    fireEvent.change(addCustomShiftInput, { target: { value: 'Custom Shift' } });
    fireEvent.click(workTypeDropDown); // opens dropdown
    expect(screen.getByRole('option', { name: /Work From Home/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('option', { name: /Hybrid Work/i }));

    expect(addShiftButton).toBeEnabled();

    fireEvent.click(addShiftButton);

    expect(screen.queryByText(/Hybrid Work /i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Added Shifts', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Custom Shift/i, level: 1 })).toBeInTheDocument();

    fireEvent.change(addCustomShiftInput, { target: { value: 'custom shift 2' } });
    fireEvent.click(workTypeDropDown);
    fireEvent.click(screen.getByRole('option', { name: /Work From Home/i }));

    expect(addShiftButton).toBeEnabled();

    fireEvent.click(addShiftButton);

    expect(screen.queryByText(/Work From Home /i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /custom shift 2/i, level: 1 })).toBeInTheDocument();

    const deleteShiftButton = screen.getAllByRole('button', { name: 'Delete section' });

    expect(deleteShiftButton).toHaveLength(2);

    fireEvent.click(deleteShiftButton[0]);

    expect(
      screen.queryByRole('heading', { name: 'Custom Shift', level: 1 })
    ).not.toBeInTheDocument();

    fireEvent.click(deleteShiftButton[1]);

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

    await user.click(skipButton);
    expect(onNext).toHaveBeenCalledTimes(1);

    await user.click(continueButton);
    expect(onNext).toHaveBeenCalledTimes(2);

    await user.click(prevButton);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });
});
