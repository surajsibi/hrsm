import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ResetPassword from '@/features/password-reset/ResetEmail';

describe('features / password-reset / ResetPassword', () => {
  const ResetPasswordSetup = (props = {}) => {
    const defaultProps = {
      onNext: jest.fn(),
    };

    render(<ResetPassword {...defaultProps} {...props} />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const sendButton = screen.getByRole('button', { name: /send otp/i });

    return { emailInput, sendButton, ...defaultProps };
  };

  it('renders all UI elements correctly', () => {
    const { emailInput, sendButton } = ResetPasswordSetup();

    expect(screen.getByRole('heading', { name: /Reset Password/i, level: 3 })).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  it('show error if email is not valid and button disabled and enable if valid ', async () => {
    const { emailInput, sendButton } = ResetPasswordSetup();

    await userEvent.click(emailInput);
    await userEvent.tab();

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();

    expect(sendButton).toBeDisabled();

    await userEvent.type(emailInput, 'test@example.com');
    expect(sendButton).toBeEnabled();
  });

  it('calls onNext when valid data is submitted', async () => {
    const onNext = jest.fn();
    const { emailInput, sendButton } = ResetPasswordSetup({ onNext });

    await userEvent.type(emailInput, 'test@example.com');

    expect(sendButton).toBeEnabled();
    await userEvent.click(sendButton);

    await waitFor(() => {
      expect(onNext).toHaveBeenCalledTimes(1);
    });
  });
});
