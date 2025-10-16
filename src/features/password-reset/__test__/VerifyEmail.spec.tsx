import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';

import VerifyEmail from '@/features/password-reset/VerifyEmail';

import type { PasswordSetup } from '@/types/passwordSetup.types';
import type { ReactNode } from 'react';

describe('features / password-reset / VerifyEmail', () => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm<PasswordSetup>({ mode: 'all' });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  const VerifyEmailSetup = (props = {}) => {
    const defaultProps = {
      onNext: jest.fn(),
      onPrev: jest.fn(),
    };

    render(
      <Wrapper>
        <VerifyEmail {...defaultProps} {...props} />
      </Wrapper>
    );

    const otpInput = screen.getByRole('textbox', { name: /Veification Code/i });
    const backButton = screen.getByRole('button', { name: /Back/i });
    const verifyButton = screen.getByRole('button', { name: /Verify OTP/i });

    return { otpInput, backButton, verifyButton, ...defaultProps };
  };

  it('renders all UI elements correctly', async () => {
    const { otpInput, backButton, verifyButton } = VerifyEmailSetup();

    expect(screen.getByRole('heading', { name: /Verify Email/i, level: 3 })).toBeInTheDocument();

    expect(otpInput).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    expect(verifyButton).toBeInTheDocument();
  });

  it('show error if email is not valid and button disabled and enable if valid', async () => {
    const { otpInput, verifyButton } = VerifyEmailSetup();

    await userEvent.click(otpInput);
    await userEvent.tab();

    expect(await screen.findByText(/OTP should be at least 6 characters/i)).toBeInTheDocument();

    expect(verifyButton).toBeDisabled();

    await userEvent.clear(otpInput);
    await userEvent.type(otpInput, 'abcdef');

    expect(await screen.findByText(/OTP should be numeric/i)).toBeInTheDocument();

    expect(verifyButton).toBeDisabled();

    await userEvent.clear(otpInput);
    await userEvent.type(otpInput, '123456');

    expect(verifyButton).toBeEnabled();
  });

  it("test case for 'Back' button", async () => {
    const onPrev = jest.fn();
    const { backButton } = VerifyEmailSetup({ onPrev });

    await userEvent.click(backButton);

    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it('test case for "Verify" button', async () => {
    const onNext = jest.fn();
    const { otpInput, verifyButton } = VerifyEmailSetup({ onNext });

    await userEvent.type(otpInput, '123456');

    expect(verifyButton).toBeEnabled();
    await userEvent.click(verifyButton);

    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
