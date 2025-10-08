import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';

import VerifyEmail from '@/features/password-reset/VerifyEmail';

import type { PasswordSetup } from '@/types/passwordSetup.types';
import type { ReactNode } from 'react';

describe('VerifyEmail', () => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm<PasswordSetup>({ mode: 'all' });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it('should render the component', () => {
    render(
      <Wrapper>
        <VerifyEmail onNext={jest.fn()} onPrev={jest.fn()} />
      </Wrapper>
    );
    expect(screen.getByText(/Verify Email/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Enter your verification code we sent to your email/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter 6 digit code/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Verify OTP/i })).toBeInTheDocument();
  });

  it('should show error if code is not valid or empty', async () => {
    render(
      <Wrapper>
        <VerifyEmail onNext={jest.fn()} onPrev={jest.fn()} />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText(/Enter 6 digit code/i);

    await userEvent.click(input);
    await userEvent.tab();

    expect(screen.getByText(/OTP is required/i)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Verify OTP/i });

    expect(button).toBeDisabled();

    await userEvent.type(input, '12345');

    expect(screen.getByText(/OTP must be 6 digits long/i)).toBeInTheDocument();
    expect(button).toBeDisabled();

    await userEvent.type(input, '123456');

    expect(button).not.toBeDisabled();

    await userEvent.clear(input);

    expect(button).toBeDisabled();
  });

  it("test case for 'Back' button", async () => {
    const onPrev = jest.fn();

    render(
      <Wrapper>
        <VerifyEmail onNext={jest.fn()} onPrev={onPrev} />
      </Wrapper>
    );

    const button = screen.getByRole('button', { name: /Back/i });

    await userEvent.click(button);

    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it('test case for "Verify OTP" button', async () => {
    const onNext = jest.fn();

    render(
      <Wrapper>
        <VerifyEmail onNext={onNext} onPrev={jest.fn()} />
      </Wrapper>
    );

    const input = screen.getByPlaceholderText(/Enter 6 digit code/i);
    const button = screen.getByRole('button', { name: /Verify OTP/i });

    expect(button).toBeDisabled();

    await userEvent.type(input, '123456');

    expect(button).not.toBeDisabled();

    await userEvent.click(button);

    expect(button).toHaveTextContent('Verifying...');
    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(onNext).toHaveBeenCalledTimes(1);
    });
  });
});
