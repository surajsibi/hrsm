// __tests__/ResetPassword.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';

import ResetPassword from '@/features/password-reset/ResetEmail';

import type { PasswordSetup } from '@/types/passwordSetup.types';
import type { ReactNode } from 'react';

describe('Reset password component', () => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm<PasswordSetup>({ mode: 'all' });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it('renders with heading', () => {
    render(
      <Wrapper>
        <ResetPassword onNext={jest.fn()} />
      </Wrapper>
    );

    expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Enter your email to recive a verification code/i)).toBeInTheDocument();
  });

  it('can not submit if is not valid ', async () => {
    render(
      <Wrapper>
        <ResetPassword onNext={jest.fn()} />
      </Wrapper>
    );

    const sendButton = screen.getByRole('button', { name: /send otp/i });

    expect(sendButton).toBeDisabled();
  });

  it('can submit if is valid ', async () => {
    render(
      <Wrapper>
        <ResetPassword onNext={jest.fn()} />
      </Wrapper>
    );
    const emailInput = screen.getByPlaceholderText('Enter your email');

    await userEvent.type(emailInput, 'test@example.com');
    const sendButton = screen.getByRole('button', { name: /send otp/i });

    expect(sendButton).not.toBeDisabled();
  });
  it('on submit onNext run', async () => {
    const onNext = jest.fn();

    render(
      <Wrapper>
        <ResetPassword onNext={onNext} />
      </Wrapper>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');

    await userEvent.type(emailInput, 'test@example.com');

    const sendButton = screen.getByRole('button', { name: /send otp/i });

    await userEvent.click(sendButton);

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('on submit button text change', async () => {
    render(
      <Wrapper>
        <ResetPassword onNext={jest.fn()} />
      </Wrapper>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');

    await userEvent.type(emailInput, 'test@example.com');

    const sendButton = screen.getByRole('button', { name: /send otp/i });

    expect(sendButton).not.toBeDisabled();

    await userEvent.click(sendButton);
  });

  it('should show error if not valid email', async () => {
    render(
      <Wrapper>
        <ResetPassword onNext={jest.fn()} />
      </Wrapper>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');

    await userEvent.type(emailInput, 'test');

    expect(screen.getByText('*Invalid email address*')).toBeInTheDocument();
  });
});
