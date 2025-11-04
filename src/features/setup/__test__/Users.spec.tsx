import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Users } from '@/features/setup/Users';

describe('features / setup / Users', () => {
  const user = userEvent.setup();
  const UserSetup = (props = {}) => {
    const defaultProps = {
      onNext: jest.fn(),
      onPrev: jest.fn(),
    };

    const renderComponent = render(<Users {...defaultProps} {...props} />);

    const firstNameInput = screen.getByRole('textbox', { name: /First Name/i });
    const lastNameInput = screen.getByRole('textbox', { name: /Last Name/i });
    const emailInput = screen.getByRole('textbox', { name: /Email Address/i });
    const phoneInput = screen.getByRole('textbox', { name: /Phone Number/i });
    const dobInput = screen.getByLabelText(/Date of Birth/i);
    const genderDropDown = screen.getByRole('combobox', { name: /Gender/i });
    const addressInput = screen.getByRole('textbox', { name: 'Address' });
    const departmenDropDown = screen.getByRole('combobox', { name: /Department/i });
    const designationDropDown = screen.getByRole('combobox', { name: /Designation/i });
    const roleDropDown = screen.getByRole('combobox', { name: /User Role/i });
    const passwordInput = screen.getByRole('textbox', { name: /Password/i });
    const generatePasswordButton = screen.getByRole('button', { name: /Generate/i });
    const probationPeriodButton = screen.getByRole('button', {
      name: /Employee is on probation period/i,
    });
    const addUserButton = screen.getByRole('button', { name: /Add User/i });
    const skipButton = screen.getByRole('button', { name: /Skip This Step/i });
    const completeSetupButton = screen.getByRole('button', { name: /Complete Setup/i });
    const prevButton = screen.getByRole('button', { name: /Previous Step/i });

    return {
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      dobInput,
      genderDropDown,
      addressInput,
      departmenDropDown,
      designationDropDown,
      roleDropDown,
      passwordInput,
      generatePasswordButton,
      probationPeriodButton,
      addUserButton,
      skipButton,
      completeSetupButton,
      prevButton,
      ...renderComponent,
    };
  };

  it('should render all ui elements correctly', () => {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      dobInput,
      genderDropDown,
      addressInput,
      departmenDropDown,
      designationDropDown,
      roleDropDown,
      passwordInput,
      generatePasswordButton,
      probationPeriodButton,
      addUserButton,
      skipButton,
      completeSetupButton,
      prevButton,
    } = UserSetup();

    expect(screen.getByRole('heading', { name: /Users/i, level: 3 })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Add Team Members/i, level: 3 })
    ).toBeInTheDocument();

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(dobInput).toBeInTheDocument();
    expect(genderDropDown).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(departmenDropDown).toBeInTheDocument();
    expect(designationDropDown).toBeInTheDocument();
    expect(roleDropDown).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(generatePasswordButton).toBeInTheDocument();
    expect(probationPeriodButton).toBeInTheDocument();
    expect(addUserButton).toBeInTheDocument();
    expect(skipButton).toBeInTheDocument();
    expect(completeSetupButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
  });

  it('add and remove custom user ', async () => {
    const { firstNameInput, lastNameInput, emailInput, phoneInput, addUserButton } = UserSetup();

    expect(screen.queryByText('Added Users')).not.toBeInTheDocument();

    expect(addUserButton).toBeDisabled();

    fireEvent.change(firstNameInput, { target: { value: 'firstName' } });
    fireEvent.change(lastNameInput, { target: { value: 'lastName' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.click(addUserButton);

    expect(screen.queryByText('Added Users')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /firstName lastName/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText(/test@example.com • EMPLOYEE/i)).toBeInTheDocument();

    expect(addUserButton).toBeDisabled();

    fireEvent.change(firstNameInput, { target: { value: 'firstName2' } });
    fireEvent.change(lastNameInput, { target: { value: 'lastName2' } });
    fireEvent.change(emailInput, { target: { value: 'test2@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.click(addUserButton);

    expect(
      screen.getByRole('heading', { name: /firstName2 lastName2/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText(/test2@example.com • EMPLOYEE/i)).toBeInTheDocument();

    const deleteButton = screen.getAllByRole('button', { name: /Delete Section/i });

    expect(deleteButton.length).toBe(2);

    fireEvent.click(deleteButton[0]);

    expect(
      screen.queryByRole('heading', { name: /firstName lastName/i, level: 1 })
    ).not.toBeInTheDocument();

    fireEvent.click(deleteButton[0]);
    expect(screen.queryByText('Added Users')).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: /firstName2 lastName2/i, level: 1 })
    ).not.toBeInTheDocument();
  });

  it('test case for skip ,complete and prev button', async () => {
    const onNext = jest.fn();
    const onPrev = jest.fn();
    const { skipButton, completeSetupButton, prevButton } = UserSetup({ onNext, onPrev });

    await user.click(skipButton);
    expect(onNext).toHaveBeenCalledTimes(1);

    await user.click(completeSetupButton);
    expect(onNext).toHaveBeenCalledTimes(2);

    await user.click(prevButton);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });
});
