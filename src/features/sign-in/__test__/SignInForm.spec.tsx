import { fireEvent, render, screen } from '@testing-library/react';

import SignInForm from '@/features/sign-in/SignInForm';

describe('features / sign-in / SignInForm', () => {
  function renderComponent() {
    return render(<SignInForm />);
  }

  it('renders headers and description text', () => {
    renderComponent();
    expect(screen.getByText('HRMS Portal')).toBeInTheDocument();
    expect(screen.getByText('Sign in to your admin dashboard')).toBeInTheDocument();
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Enter your credentials to access the system')).toBeInTheDocument();
  });

  it('renders input fields with labels', () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/Tenant Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email \/ Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', async () => {
    render(<SignInForm />);

    const button = screen.getByRole('button', { name: /Sign In to Dashboard/i });

    fireEvent.click(button);

    expect(await screen.findByText(/Tenant Code is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
  });

  it('shows invalid email message if email is wrong', async () => {
    render(<SignInForm />);

    fireEvent.input(screen.getByLabelText(/Tenant Code/i), { target: { value: 'ABC123' } });
    fireEvent.input(screen.getByLabelText(/Email \/ Username/i), {
      target: { value: 'wrong-email' },
    });
    fireEvent.input(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign In to Dashboard/i }));

    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
  });

  it('submits form successfully with valid inputs', async () => {
    render(<SignInForm />);

    fireEvent.input(screen.getByLabelText(/Tenant Code/i), { target: { value: 'ABC123' } });
    fireEvent.input(screen.getByLabelText(/Email \/ Username/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign In to Dashboard/i }));
  });

  it('renders footer with app name', () => {
    render(<SignInForm />);

    expect(screen.getByText(/All Rights Reserved/i)).toBeInTheDocument();
  });
});
