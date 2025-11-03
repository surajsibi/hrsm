import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignInForm } from '@/features/sign-in/SignInForm';

describe('features / sign-in / SignInForm', () => {
  const user = userEvent.setup();
  const SignInFormSetup = (props = {}) => {
    const { debug } = render(<SignInForm {...props} />);
    const tenantCodeInput = screen.getByRole('textbox', { name: /tenant code/i });
    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in to dashboard/i });

    return { tenantCodeInput, emailInput, passwordInput, signInButton, debug };
  };

  it('renders all UI elements correctly', () => {
    const { tenantCodeInput, emailInput, passwordInput, signInButton } = SignInFormSetup();

    expect(screen.getByRole('heading', { name: /hrms portal/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /welcome back/i, level: 3 })).toBeInTheDocument();

    expect(tenantCodeInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it('shows validation error messages properly', async () => {
    const { tenantCodeInput, emailInput, passwordInput, signInButton } = SignInFormSetup();

    // tenant validation
    await user.click(tenantCodeInput);
    await user.tab();
    expect(await screen.findByText(/Tenant Code is required/i)).toBeInTheDocument();

    // Email validation
    await user.click(emailInput);
    await user.tab();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();

    await user.type(emailInput, 'test');
    await user.tab();
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();

    // Password validation
    await user.click(passwordInput);
    await user.tab();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();

    await user.type(passwordInput, 'test');
    await user.tab();
    expect(
      await screen.findByText(/password should be at least 6 characters/i)
    ).toBeInTheDocument();

    // Empty form submission
    await user.clear(emailInput);
    await user.clear(passwordInput);

    expect(signInButton).toBeDisabled();
  });

  it('test case for signin', async () => {
    const { tenantCodeInput, emailInput, passwordInput, signInButton } = SignInFormSetup();
    const consoleSpy = jest.spyOn(console, 'log');

    await user.type(tenantCodeInput, 'test');
    await user.type(emailInput, 'test@gmail.com');
    await user.type(passwordInput, 'testasas');

    await user.click(signInButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
    expect(consoleSpy).toHaveBeenCalledWith('Login successful');
  });
});
