import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Users from '@/features/setup/Users';

describe('Users', () => {
  const onNext = jest.fn();
  const onPrev = jest.fn();

  it('should render the component', () => {
    render(<Users onNext={onNext} onPrev={onPrev} />);

    expect(screen.getByRole('heading', { name: 'Users', level: 3 })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter first name')).toBeInTheDocument();
    expect(screen.getByTestId('User')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('user@company.com')).toBeInTheDocument();
    expect(screen.getByTestId('Mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+1 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByTestId('Phone')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByTestId('Calendar')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter complete address')).toBeInTheDocument();
    expect(screen.getByTestId('MapPin')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Work Information', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Select designation')).toBeInTheDocument();
    expect(screen.getByLabelText('Department')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Auto-generated if empty')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Employee is on probation period' })
    ).toBeInTheDocument();
    expect(screen.queryByTestId('probationStartDate')).not.toBeInTheDocument();
    expect(screen.queryByTestId('probationEndDate')).not.toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Add User' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add User' })).toBeDisabled();

    expect(
      screen.queryByRole('heading', { name: 'Added Users', level: 3 })
    ).not.toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Skip This Step' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Complete Setup' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous Step' })).toBeInTheDocument();
  });

  it('add and remove user', async () => {
    render(<Users onNext={onNext} onPrev={onPrev} />);
    const firstName = screen.getByPlaceholderText('Enter first name');

    expect(firstName).toBeInTheDocument();
    await userEvent.type(firstName, 'John');

    const lastName = screen.getByPlaceholderText('Enter last name');

    expect(lastName).toBeInTheDocument();
    await userEvent.type(lastName, 'Doe');

    const email = screen.getByPlaceholderText('user@company.com');

    expect(email).toBeInTheDocument();
    await userEvent.type(email, 'user@company');

    const phone = screen.getByPlaceholderText('+1 (555) 123-4567');

    expect(phone).toBeInTheDocument();
    await userEvent.type(phone, '1234567890');

    const gender = screen.getByRole('button', { name: 'Gender' });

    expect(gender).toBeInTheDocument();
    await userEvent.click(gender);
    await userEvent.click(screen.getByRole('option', { name: 'Female' }));

    const password = screen.getByRole('button', { name: 'Generate' });

    expect(password).toBeInTheDocument();
    await userEvent.click(password);

    const add = screen.getByRole('button', { name: 'Add User' });

    expect(add).toBeInTheDocument();
    expect(add).toBeEnabled();
    await userEvent.click(add);

    expect(screen.getByRole('heading', { name: 'Added Users', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'John Doe', level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId('Trash2')).toBeInTheDocument();

    const remove = screen.getByRole('button', { name: 'Delete section' });

    expect(remove).toBeInTheDocument();
    await userEvent.click(remove);

    expect(add).toBeDisabled();

    expect(screen.queryByText('Added Users')).not.toBeInTheDocument();
  });

  it('probation period', async () => {
    render(<Users onNext={onNext} onPrev={onPrev} />);

    const probation = screen.getByRole('button', { name: 'Employee is on probation period' });

    expect(screen.queryByTestId('probationStartDate')).not.toBeInTheDocument();
    expect(screen.queryByTestId('probationEndDate')).not.toBeInTheDocument();

    expect(probation).toBeInTheDocument();
    await userEvent.click(probation);

    expect(screen.queryByTestId('probationStartDate')).toBeInTheDocument();
    expect(screen.queryByTestId('probationEndDate')).toBeInTheDocument();
  });

  it('auto generate password button', async () => {
    render(<Users onNext={onNext} onPrev={onPrev} />);

    const input = screen.getByPlaceholderText('Auto-generated if empty');

    expect(input).toHaveValue('');

    const generateBtn = screen.getByRole('button', { name: 'Generate' });

    await userEvent.click(generateBtn);

    expect(input).not.toHaveValue('');

    const generatedPassword = (input as HTMLInputElement).value;

    expect(generatedPassword).toMatch(/^[A-Za-z0-9!@#$%^&*()\-_=+[\]{};:,.<>?]+$/);

    await userEvent.clear(input);

    expect(input).toHaveValue('');

    await userEvent.type(input, 'test');

    const typedPassword = (input as HTMLInputElement).value;

    expect(typedPassword).toBe('test');
  });

  it('skip and complete', async () => {
    render(<Users onNext={onNext} onPrev={onPrev} />);

    const firstName = screen.getByPlaceholderText('Enter first name');

    expect(firstName).toBeInTheDocument();
    await userEvent.type(firstName, 'John');

    const lastName = screen.getByPlaceholderText('Enter last name');

    expect(lastName).toBeInTheDocument();
    await userEvent.type(lastName, 'Doe');

    const email = screen.getByPlaceholderText('user@company.com');

    expect(email).toBeInTheDocument();
    await userEvent.type(email, 'user@company');

    const phone = screen.getByPlaceholderText('+1 (555) 123-4567');

    expect(phone).toBeInTheDocument();
    await userEvent.type(phone, '1234567890');

    const gender = screen.getByRole('button', { name: 'Gender' });

    expect(gender).toBeInTheDocument();
    await userEvent.click(gender);
    await userEvent.click(screen.getByRole('option', { name: 'Female' }));

    const password = screen.getByRole('button', { name: 'Generate' });

    expect(password).toBeInTheDocument();
    await userEvent.click(password);

    const add = screen.getByRole('button', { name: 'Add User' });

    expect(add).toBeInTheDocument();
    expect(add).toBeEnabled();
    await userEvent.click(add);

    const skip = screen.getByRole('button', { name: 'Skip This Step' });

    expect(skip).toBeInTheDocument();
    await userEvent.click(skip);

    expect(onNext).toHaveBeenCalledTimes(1);

    const complete = screen.getByRole('button', { name: 'Complete Setup' });

    expect(complete).toBeInTheDocument();
    await userEvent.click(complete);
    expect(complete).toBeEnabled();
    expect(onNext).toHaveBeenCalledTimes(2);

    const prev = screen.getByRole('button', { name: 'Previous Step' });

    expect(prev).toBeInTheDocument();
    await userEvent.click(prev);

    expect(onPrev).toHaveBeenCalledTimes(1);
  });
});
