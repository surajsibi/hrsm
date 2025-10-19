import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PasswordResetForm from '@/features/password-reset/PasswordResetForm';

import type { ReactNode } from 'react';

jest.mock('@/features/password-reset/ResetEmail', () => ({
  __esModule: true,
  default: ({ onNext }: { onNext: () => void }) => (
    <div>
      <p>ResetPassword Step</p>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

jest.mock('@/features/password-reset/VerifyEmail', () => ({
  __esModule: true,
  default: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
    <div>
      <p>VerifyEmail Step</p>
      <button onClick={onPrev}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

jest.mock('@/features/password-reset/SetNewPassword', () => ({
  __esModule: true,
  default: () => <p>SetNewPassword Step</p>,
}));

jest.mock('@/components/ui/utils/Titles', () => ({
  Title: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
}));
jest.mock('@/components/ui/utils/Descriptions', () => ({
  Description: ({ children }: { children: ReactNode }) => <p>{children}</p>,
}));
jest.mock('@/components/ui/utils/StepsCircle', () => ({
  StepsCircle: ({ currentStep }: { currentStep: number }) => (
    <div data-testid="step-indicator">Step {currentStep}</div>
  ),
}));

describe('PasswordResetForm', () => {
  it('renders the first step (ResetPassword) by default', () => {
    render(<PasswordResetForm />);
    expect(screen.getByText(/ResetPassword Step/i)).toBeInTheDocument();
    expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 1');
  });

  it('navigates to VerifyEmail on Next from step 1', async () => {
    render(<PasswordResetForm />);
    await userEvent.click(screen.getByText(/Next/i));

    expect(await screen.findByText(/VerifyEmail Step/i)).toBeInTheDocument();
    expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 2');
  });

  it('goes back to ResetPassword from VerifyEmail on Back', async () => {
    render(<PasswordResetForm />);
    await userEvent.click(screen.getByText(/Next/i)); // go to step 2
    await userEvent.click(screen.getByText(/Back/i)); // go back

    expect(await screen.findByText(/ResetPassword Step/i)).toBeInTheDocument();
    expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 1');
  });

  it('navigates to SetNewPassword on Next from VerifyEmail', async () => {
    render(<PasswordResetForm />);
    await userEvent.click(screen.getByText(/Next/i)); // step 1 → 2
    await userEvent.click(screen.getByText(/Next/i)); // step 2 → 3

    expect(await screen.findByText(/SetNewPassword Step/i)).toBeInTheDocument();
    expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 3');
  });
});
