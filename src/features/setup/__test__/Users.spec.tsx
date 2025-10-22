import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Users from '@/features/setup/Users';

jest.mock('@/components/ui/utils/AddSections', () => ({
  AddedSection: ({ title, description, onDelete }: never) => (
    <div data-testid="mock-added-section">
      <h4>{title}</h4>
      <p>{description}</p>
      <button data-testid="Delete section" onClick={onDelete}>
        Delete
      </button>
    </div>
  ),
}));

describe('features / setup / Users', () => {
  const UserSetup = (props = {}) => {
    const defaultProps = {
      onNext: jest.fn(),
      onPrev: jest.fn(),
    };

    render(<Users {...defaultProps} {...props} />);

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

    expect(screen.queryByTestId('mock-added-section')).not.toBeInTheDocument();

    expect(addUserButton).toBeDisabled();

    await userEvent.type(firstNameInput, 'firstName');
    await userEvent.type(lastNameInput, 'lastName');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(phoneInput, '1234567890');
    await userEvent.click(addUserButton);

    expect(screen.getByTestId('mock-added-section')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /firstName lastname/i, level: 4 })
    ).toBeInTheDocument();
    expect(screen.getByText(/test@example.com • EMPLOYEE/i)).toBeInTheDocument();

    expect(addUserButton).toBeDisabled();

    await userEvent.type(firstNameInput, 'firstName2');
    await userEvent.type(lastNameInput, 'lastName2');
    await userEvent.type(emailInput, 'test2@example.com');
    await userEvent.type(phoneInput, '1234567890');
    await userEvent.click(addUserButton);

    expect(screen.getAllByTestId('mock-added-section').length).toBe(2);
    expect(
      screen.getByRole('heading', { name: /firstName2 lastname2/i, level: 4 })
    ).toBeInTheDocument();
    expect(screen.getByText(/test2@example.com • EMPLOYEE/i)).toBeInTheDocument();

    const deleteButtons = screen.getAllByTestId('Delete section');

    expect(deleteButtons.length).toBe(2);

    await userEvent.click(deleteButtons[0]);

    expect(screen.getAllByTestId('mock-added-section').length).toBe(1);
    expect(
      screen.queryByRole('heading', { name: /firstName lastname/i, level: 4 })
    ).not.toBeInTheDocument();

    await userEvent.click(deleteButtons[0]);

    expect(screen.queryByTestId('mock-added-section')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /firstName2 lastname2/i, level: 4 })
    ).not.toBeInTheDocument();
  }, 9000);

  it('test case for skip ,complete and prev button', async () => {
    const onNext = jest.fn();
    const onPrev = jest.fn();
    const { skipButton, completeSetupButton, prevButton } = UserSetup({ onNext, onPrev });

    await userEvent.click(skipButton);
    expect(onNext).toHaveBeenCalledTimes(1);

    await userEvent.click(completeSetupButton);
    expect(onNext).toHaveBeenCalledTimes(2);

    await userEvent.click(prevButton);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });
});
