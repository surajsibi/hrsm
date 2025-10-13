import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignInForm from '@/features/sign-in/SignInForm';

describe('features / sign-in / SignInForm', () => {
  function renderComponent() {
    return render(
      <SignInForm
        formSubmit={() => {
          /* implementation here */
        }}
      />
    );
  }

  it('render full component', () => {
    renderComponent();

    expect(screen.getByRole('heading', { name: 'HRMS Portal', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Welcome Back', level: 3 })).toBeInTheDocument();
    const tenantCode = screen.getByTestId('tenantCode');

    expect(tenantCode).toBeInTheDocument();
    const Building2 = within(tenantCode).getByTestId('Building2');

    expect(Building2).toBeInTheDocument();
    expect(screen.getByPlaceholderText('admin@company.com')).toBeInTheDocument();
    expect(screen.getByTestId('User')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByTestId('Lock')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In to Dashboard' })).toBeInTheDocument();
    expect(screen.getByText(/All Rights Reserved/i)).toBeInTheDocument();
  });

  it('should render error message', async () => {
    renderComponent();
    const email = screen.getByPlaceholderText('admin@company.com');

    expect(email).toBeInTheDocument();
    await userEvent.click(email);
    await userEvent.tab();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();

    await userEvent.type(email, 'test');
    await userEvent.tab();
    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();

    const password = screen.getByPlaceholderText('Enter your password');

    await userEvent.click(password);
    await userEvent.tab();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();

    await userEvent.type(password, 'test');
    await userEvent.tab();
    expect(screen.getByText(/Password should be at least 6 characters/i)).toBeInTheDocument();

    await userEvent.clear(email);
    await userEvent.clear(password);

    const button = screen.getByRole('button', { name: 'Sign In to Dashboard' });

    await userEvent.click(button);
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  it('submit button test case', async () => {
    const formSubmit = jest.fn();

    render(<SignInForm formSubmit={formSubmit} />);
    const email = screen.getByPlaceholderText('admin@company.com');
    const password = screen.getByPlaceholderText('Enter your password');
    const button = screen.getByRole('button', { name: 'Sign In to Dashboard' });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    await userEvent.type(email, 'admin@company');
    await userEvent.type(password, 'test123');
    await userEvent.click(button);

    waitFor(() => {
      expect(formSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
