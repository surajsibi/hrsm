import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignInForm } from '@/features/sign-in/SignInForm';

describe('features / sign-in / SignInForm', () => {
  const user = userEvent.setup();
  const SignInFormSetup = (props = {}) => {
    const defaultProps = {
      onSubmit: jest.fn(),
    };
    const renderComponent = render(<SignInForm {...defaultProps} {...props} />);
    const hrmsHeader = screen.getByRole('heading', { name: /hrms portal/i, level: 1 });
    const welcomeBackHeader = screen.getByRole('heading', { name: /welcome back/i, level: 3 });
    const tenantCodeInput = screen.getByRole('textbox', { name: /tenant code/i });
    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in to dashboard/i });

    return {
      tenantCodeInput,
      emailInput,
      passwordInput,
      signInButton,
      hrmsHeader,
      welcomeBackHeader,
      ...renderComponent,
    };
  };

  it('renders all UI elements correctly', () => {
    const {
      tenantCodeInput,
      emailInput,
      passwordInput,
      signInButton,
      hrmsHeader,
      welcomeBackHeader,
    } = SignInFormSetup();

    expect(hrmsHeader).toBeInTheDocument();
    expect(welcomeBackHeader).toBeInTheDocument();
    expect(tenantCodeInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it('shows validation error messages properly', async () => {
    const { tenantCodeInput, emailInput, passwordInput, signInButton } = SignInFormSetup();

    await user.click(tenantCodeInput);
    await user.tab();
    expect(await screen.findByText(/Tenant Code is required/i)).toBeInTheDocument();

    await user.click(emailInput);
    await user.tab();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();

    await user.type(emailInput, 'test');
    await user.tab();
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();

    await user.click(passwordInput);
    await user.tab();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();

    expect(signInButton).toBeDisabled();
  });

  it('onsubmit to be call when submit', async () => {
    const onSubmit = jest.fn();
    const { tenantCodeInput, emailInput, passwordInput, signInButton } = SignInFormSetup({
      onSubmit,
    });

    await user.type(tenantCodeInput, 'test');
    await user.type(emailInput, 'test@gmail.com');
    await user.type(passwordInput, 'testasas');

    await user.click(signInButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
