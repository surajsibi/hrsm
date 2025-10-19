import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SetNewPassword from '@/features/password-reset/SetNewPassword';

describe('features / password-reset / SetNewPassword', () => {
  const SetNewPasswordSetup = () => {
    render(<SetNewPassword />);

    const newPasswordInput = screen.getByRole('textbox', { name: /New Password/i });
    const confirmPasswordInput = screen.getByRole('textbox', { name: /Confirm Password/i });
    const submitButton = screen.getByRole('button', { name: /update password/i });

    return { newPasswordInput, confirmPasswordInput, submitButton };
  };

  it('render all ui elements correctly', () => {
    const { newPasswordInput, confirmPasswordInput, submitButton } = SetNewPasswordSetup();

    expect(
      screen.getByRole('heading', { name: /Set New Password/i, level: 3 })
    ).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('show error if password and confirm password is not valid ("input field are empty or not matching") button are disable if input fields are not valid and enable when input fields are valid', async () => {
    const { newPasswordInput, confirmPasswordInput, submitButton } = SetNewPasswordSetup();

    await userEvent.click(newPasswordInput);
    await userEvent.tab();

    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();

    await userEvent.click(confirmPasswordInput);
    await userEvent.tab();

    expect(screen.getByText(/Confirm password is required/i)).toBeInTheDocument();

    expect(submitButton).toBeDisabled();

    await userEvent.type(newPasswordInput, 'password');
    await userEvent.type(confirmPasswordInput, 'different-password');

    expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Confirm password is required/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await userEvent.clear(confirmPasswordInput);
    await userEvent.type(confirmPasswordInput, 'password');

    expect(screen.queryByText(/Passwords do not match/i)).not.toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });
});
