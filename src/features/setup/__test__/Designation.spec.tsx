import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Designation from '@/features/setup/Designation';
describe('features / setup / Designation', () => {
  const onNext = jest.fn();
  const onPrev = jest.fn();

  it('should render the component', () => {
    render(<Designation onNext={onNext} onPrev={onPrev} />);
    expect(screen.getByText('Designations')).toBeInTheDocument();
    expect(screen.getByText('Add Custom Designation')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Legal Counsel' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter designation name')).toBeInTheDocument();
    expect(screen.getByText('Select department')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Select department' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Designation' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Designation' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Skip This Step' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous Step' })).toBeInTheDocument();
  });

  it('selecting quick designation', async () => {
    render(<Designation onNext={onNext} onPrev={onPrev} />);
    expect(screen.getByText('Quick Add by Department')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Legal Counsel' });

    expect(button).toBeInTheDocument();
    await userEvent.click(button);

    expect(screen.getByText('Added Designations')).toBeInTheDocument();
    expect(screen.queryByText('1 designation')).toBeInTheDocument();
    expect(screen.getByLabelText(/Delete section/i)).toBeInTheDocument();
  });

  it('adding custom designation and deleting it', async () => {
    render(<Designation onNext={onNext} onPrev={onPrev} />);
    const input = screen.getByPlaceholderText('Enter designation name');
    const button = screen.getByRole('button', { name: 'Add Designation' });
    const dropdown = screen.getByRole('button', { name: 'Select department' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();

    await userEvent.type(input, 'custom designation');
    expect(button).toBeDisabled();

    await userEvent.click(dropdown);
    await userEvent.click(screen.getByRole('option', { name: 'Legal & Compliance' }));

    expect(button).not.toBeDisabled();
    await userEvent.click(button);

    expect(screen.getByText('Added Designations')).toBeInTheDocument();
    expect(screen.queryByText('1 designation')).toBeInTheDocument();

    const deleteButton = screen.getByLabelText(/Delete section/i);

    expect(deleteButton).toBeInTheDocument();
    await userEvent.click(deleteButton);

    expect(screen.queryByText('1 designation')).not.toBeInTheDocument();
  });

  it('calls onNext and onPrev when respective buttons clicked', async () => {
    render(<Designation onNext={onNext} onPrev={onPrev} />);

    const skipButton = screen.getByRole('button', { name: /Skip This Step/i });
    const nextButton = screen.getByRole('button', { name: /Continue/i });
    const prevButton = screen.getByRole('button', { name: /Previous Step/i });

    await userEvent.click(skipButton);
    expect(onNext).toHaveBeenCalledTimes(1);

    await userEvent.click(nextButton);
    expect(onNext).toHaveBeenCalledTimes(2);

    await userEvent.click(prevButton);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });
});
