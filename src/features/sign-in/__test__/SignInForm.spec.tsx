import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useMutation } from '@tanstack/react-query';
import SignInForm from '@/features/sign-in/SignInForm';
import { renderTest } from '@/test-utils/renderTest';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('@/actions/auth', () => ({
  login: jest.fn().mockResolvedValue({
    success: true,
    message: 'Login successful',
    data: { tenantCode: 'tenant123', email: 'user@example.com', password: 'password123' },
  }),
}));

describe('SignInForm', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  const SignInFormSetup = (props = {}) => {
    renderTest(<SignInForm {...props} />).withQueryClient();
    const tenantCodeInput = screen.getByRole('textbox', { name: /tenant code/i });
    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in to dashboard/i });

    return { tenantCodeInput, emailInput, passwordInput, signInButton };
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

  it('calls the login mutation and handles returned data', async () => {
    useMutation.mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({
        success: true,
        message: 'Login successful',
        data: { tenantCode: 'tenant123', email: 'user@example.com', password: 'password123' },
      }),
    });

    const mutateMock = jest.fn();

    useMutation.mockReturnValue({
      mutateAsync: mutateMock,
    });

    SignInFormSetup();

    const tenantCodeInput = screen.getByRole('textbox', { name: /tenant code/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in to dashboard/i });

    await userEvent.type(tenantCodeInput, 'tenant123');
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(signInButton);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledTimes(1);
      expect(mutateMock).toHaveBeenCalledWith({
        tenantCode: 'tenant123',
        email: 'user@example.com',
        password: 'password123',
      });
    });
  });
});
