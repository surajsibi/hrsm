import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';

import SetNewPassword from '@/features/password-reset/SetNewPassword';

import type { PasswordSetup } from '@/types/passwordSetup.types';
import type { ReactNode } from 'react';

describe('features / password-reset / SetNewPassword', () => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm<PasswordSetup>({ mode: 'all' });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it('render with default', () => {
    render(
      <Wrapper>
        <SetNewPassword />
      </Wrapper>
    );
    expect(screen.getByText(/Set New Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Create a strong new password for your account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter new password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm new password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update password/i })).toBeInTheDocument();
  });

  it('render with value', async () => {
    render(
      <Wrapper>
        <SetNewPassword />
      </Wrapper>
    );
    const password = screen.getByPlaceholderText(/Enter new password/i);
    const confirmPassword = screen.getByPlaceholderText(/Confirm new password/i);

    await userEvent.type(password, 'password');

    expect(password).toHaveValue('password');

    await userEvent.type(confirmPassword, 'password');

    expect(confirmPassword).toHaveValue('password');
  });

  it('check for error if no input given ', async () => {
    render(
      <Wrapper>
        <SetNewPassword />
      </Wrapper>
    );
    const password = screen.getByPlaceholderText(/Enter new password/i);
    const confirmPassword = screen.getByPlaceholderText(/Confirm new password/i);

    await userEvent.click(password);
    await userEvent.tab();

    await userEvent.click(confirmPassword);
    await userEvent.tab();

    await screen.findByText('*Password is required*');
    await screen.findByText(/Confirm password is required/i);
  });

  it("check for error if password and confirm password don't match", async () => {
    render(
      <Wrapper>
        <SetNewPassword />
      </Wrapper>
    );
    const password = screen.getByPlaceholderText(/Enter new password/i);
    const confirmPassword = screen.getByPlaceholderText(/Confirm new password/i);

    await userEvent.type(password, 'password');

    await userEvent.type(confirmPassword, 'wrong-password');

    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it('button should be disabled if form is not valid', async () => {
    render(
      <Wrapper>
        <SetNewPassword />
      </Wrapper>
    );
    const password = screen.getByPlaceholderText(/Enter new password/i);
    const confirmPassword = screen.getByPlaceholderText(/Confirm new password/i);

    await userEvent.type(password, 'password');

    expect(screen.getByRole('button', { name: /update password/i })).toBeDisabled();

    await userEvent.type(confirmPassword, 'password');

    expect(screen.getByRole('button', { name: /update password/i })).not.toBeDisabled();
  });

  it('Submitting form', async () => {
    render(
      <Wrapper>
        <SetNewPassword />
      </Wrapper>
    );
    const password = screen.getByPlaceholderText(/Enter new password/i);
    const confirmPassword = screen.getByPlaceholderText(/Confirm new password/i);

    await userEvent.type(password, 'password');
    await userEvent.type(confirmPassword, 'password');

    const setPasswordButton = screen.getByRole('button', { name: /update password/i });

    await userEvent.click(setPasswordButton);

    await userEvent.clear(password);
    await userEvent.clear(confirmPassword);

    expect(setPasswordButton).toBeDisabled();

    expect(setPasswordButton).toHaveTextContent('Update Password');
  });
});
