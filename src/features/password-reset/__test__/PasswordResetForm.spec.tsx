import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PasswordResetForm from '@/features/password-reset/PasswordResetForm';

describe('PasswordResetForm', () => {
  it('should render the reset password component', () => {
    render(<PasswordResetForm />);
    expect(screen.getByText(/Password Setup/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send OTP/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Skip for now/i })).toBeInTheDocument();
  });

  it('should render verify otp component', async () => {
    render(<PasswordResetForm />);
    expect(screen.getByText(/Password Setup/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    const input = screen.getByPlaceholderText(/Enter your email/i);
    const button = screen.getByRole('button', { name: /Send OTP/i });

    await userEvent.type(input, 'rj7bH@example.com');
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText(/Verify Email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Enter 6 digit code/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Verify OTP/i })).toBeInTheDocument();
    });
  });
  it('should render set new password component', async () => {
    render(<PasswordResetForm />);
    expect(screen.getByText(/Password Setup/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    const input = screen.getByPlaceholderText(/Enter your email/i);
    const button = screen.getByRole('button', { name: /Send OTP/i });

    await userEvent.type(input, 'rj7bH@example.com');
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText(/Verify Email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Enter 6 digit code/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Verify OTP/i })).toBeInTheDocument();
    });
    const verifyButton = screen.getByRole('button', { name: /Verify OTP/i });

    await userEvent.type(screen.getByPlaceholderText(/Enter 6 digit code/i), '123456');

    await userEvent.click(verifyButton);
    await waitFor(() => {
      expect(screen.getByText(/Set New Password/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Create a strong new password for your account/i)
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Enter new password/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Confirm new password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /update password/i })).toBeInTheDocument();
    });
  });
});
