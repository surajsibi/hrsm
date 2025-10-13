import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Shifts from '@/features/setup/Shifts';

describe('features / setup / Shifts', () => {
  const onNext = jest.fn();
  const onPrev = jest.fn();

  it('should render the component', () => {
    render(<Shifts onNext={onNext} onPrev={onPrev} />);

    expect(screen.getByText('Shifts')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Day Shift' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Night Shift' })).toBeInTheDocument();
    expect(screen.getByText('Create Custom Shift')).toBeInTheDocument();
    const input = screen.getByTestId('shiftName');
    const logo = within(input).getByTestId('Clock');

    expect(input).toBeInTheDocument();

    expect(logo).toBeInTheDocument();

    expect(screen.getByLabelText(/Work Type/i)).toBeInTheDocument();

    expect(screen.getByTestId('checkInTime')).toBeInTheDocument();

    expect(screen.getByTestId('checkOutTime')).toBeInTheDocument();

    expect(screen.getByTestId('workingHours')).toBeInTheDocument();

    expect(screen.getByText(/Weekend Days/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Monday' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enable shift tracking' })).toBeInTheDocument();

    const addShift = screen.getByTestId('add-shift');

    expect(addShift).toBeInTheDocument();
    expect(addShift).toBeDisabled();

    expect(screen.getByRole('button', { name: 'Enable shift tracking' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rotational shift' })).toBeInTheDocument();

    expect(screen.queryByText('Added Shifts')).not.toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Skip This Step' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous Step' })).toBeInTheDocument();
  });

  it('add and remove quick shift', async () => {
    render(<Shifts onNext={onNext} onPrev={onPrev} />);
    const addShiftButtons = screen.getAllByRole('button', { name: 'Add Shift' });

    expect(addShiftButtons[0]).toBeInTheDocument();
    await userEvent.click(addShiftButtons[0]);
    expect(addShiftButtons[0]).toBeDisabled();

    expect(screen.getByRole('heading', { name: 'Added Shifts' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Day Shift', level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId('Trash2')).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: 'Delete section' });

    expect(removeButton).toBeInTheDocument();
    await userEvent.click(removeButton);

    expect(addShiftButtons[0]).toBeEnabled();

    expect(screen.queryByText('Added Shifts')).not.toBeInTheDocument();
  });

  it('add and remove custom shift', async () => {
    render(<Shifts onNext={onNext} onPrev={onPrev} />);

    const shiftName = screen.getByPlaceholderText('Enter shift name');

    expect(shiftName).toBeInTheDocument();
    await userEvent.type(shiftName, 'Custom Shift');

    const workType = screen.getByRole('button', { name: 'Work Type *' });

    expect(workType).toBeInTheDocument();
    await userEvent.click(workType);
    await userEvent.click(screen.getByRole('option', { name: 'Work From Office' }));

    const rotationalShift = screen.getByRole('button', { name: 'Rotational shift' });

    expect(rotationalShift).toBeInTheDocument();
    await userEvent.click(rotationalShift);

    const shiftTracking = screen.getByRole('button', { name: 'Enable shift tracking' });

    expect(shiftTracking).toBeInTheDocument();
    await userEvent.click(shiftTracking);

    const addShift = screen.getByTestId('add-shift');

    expect(addShift).toBeInTheDocument();
    expect(addShift).toBeEnabled();
    await userEvent.click(addShift);

    expect(screen.getByRole('heading', { name: 'Added Shifts' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Custom Shift', level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId('Trash2')).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: 'Delete section' });

    expect(removeButton).toBeInTheDocument();
    await userEvent.click(removeButton);

    expect(screen.queryByText('Added Shifts')).not.toBeInTheDocument();
  });

  it('test onNext and onPrev ', async () => {
    render(<Shifts onNext={onNext} onPrev={onPrev} />);

    const skipButton = screen.getByRole('button', { name: /Skip This Step/i });
    const continueButton = screen.getByRole('button', { name: /Continue/i });
    const prevButton = screen.getByRole('button', { name: /Previous Step/i });

    expect(skipButton).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();

    await userEvent.click(skipButton);
    expect(onNext).toHaveBeenCalledTimes(1);

    await userEvent.click(continueButton);
    expect(onNext).toHaveBeenCalledTimes(2);

    await userEvent.click(prevButton);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });
});
