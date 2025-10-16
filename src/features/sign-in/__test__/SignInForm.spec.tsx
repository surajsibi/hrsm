import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignInForm from '@/features/sign-in/SignInForm';

describe('SignInForm', () => {
  const SignInFormSetup = (props = {}) => {
    const defaultProps = {
      isPending: false,
      formSubmit: jest.fn(),
    };

    render(<SignInForm {...defaultProps} {...props} />);
    const tenantCodeInput = screen.getByRole('textbox', { name: /tenant code/i });
    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in to dashboard/i });

    return { tenantCodeInput, emailInput, passwordInput, signInButton, ...defaultProps };
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
    await userEvent.click(tenantCodeInput);
    await userEvent.tab();
    expect(await screen.findByText(/Tenant Code is required/i)).toBeInTheDocument();

    // Email validation
    await userEvent.click(emailInput);
    await userEvent.tab();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();

    await userEvent.type(emailInput, 'test');
    await userEvent.tab();
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();

    // Password validation
    await userEvent.click(passwordInput);
    await userEvent.tab();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();

    await userEvent.type(passwordInput, 'test');
    await userEvent.tab();
    expect(
      await screen.findByText(/password should be at least 6 characters/i)
    ).toBeInTheDocument();

    // Empty form submission
    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);

    expect(signInButton).toBeDisabled();
  });

  it('calls formSubmit when valid data is submitted', async () => {
    const formSubmit = jest.fn();
    const { tenantCodeInput, emailInput, passwordInput, signInButton } = SignInFormSetup({
      formSubmit,
    });

    await userEvent.type(tenantCodeInput, 'admin@company');
    await userEvent.type(emailInput, 'admin@company.com');
    await userEvent.type(passwordInput, 'test123');

    expect(signInButton).toBeEnabled();
    await userEvent.click(signInButton);

    await waitFor(() => {
      expect(formSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
