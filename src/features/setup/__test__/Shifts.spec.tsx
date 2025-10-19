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

    const quickDayShiftButton = screen.getByTestId('mock-addshift-Day Shift');
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
    const deleteShiftButton = screen.queryAllByTestId('Delete section');

    return {
      quickDayShiftButton,
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
      deleteShiftButton,
    };
  };

  it('render all ui element correctly', () => {
    const {
      quickDayShiftButton,
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
});
