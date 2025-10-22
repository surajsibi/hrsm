import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SetupForm from '@/features/setup/SetupForm';

import type { ReactNode } from 'react';

// --- Mocking all step components ---
jest.mock('@/features/setup/Organization', () => ({
  __esModule: true,
  default: ({ onNext }: { onNext: () => void }) => (
    <div>
      <p>Organization Step</p>
      <button onClick={onNext}>Next</button>
      <button onClick={onNext}>Skip</button>
    </div>
  ),
}));

jest.mock('@/features/setup/Department', () => ({
  __esModule: true,
  default: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
    <div>
      <p>Department Step</p>
      <button onClick={onPrev}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

jest.mock('@/features/setup/Designation', () => ({
  __esModule: true,
  default: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
    <div>
      <p>Designation Step</p>
      <button onClick={onPrev}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

jest.mock('@/features/setup/Shifts', () => ({
  __esModule: true,
  default: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
    <div>
      <p>Shifts Step</p>
      <button onClick={onPrev}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

jest.mock('@/features/setup/Users', () => ({
  __esModule: true,
  default: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
    <div>
      <p>Users Step</p>
      <button onClick={onPrev}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

jest.mock('@/features/setup/Complete', () => ({
  __esModule: true,
  default: () => <p>Complete Step</p>,
}));

// --- Mock UI utility components ---
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

describe('SetupForm', () => {
  const SetupFormSetup = () => {
    render(<SetupForm />);

    const heading = screen.getByRole('heading', { name: /HRMS Setup Wizard/i });
    const description = screen.getByText(/Let's configure your Human Resource Management System/i);

    return { heading, description };
  };

  it('renders the first step (Organization) by default', () => {
    const { heading, description } = SetupFormSetup();

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(screen.getByText(/Organization Step/i)).toBeInTheDocument();
    expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 1');
  });

  it('navigates to Department on Next from step 1', async () => {
    SetupFormSetup();
    await userEvent.click(screen.getByText(/Next/i));
    expect(await screen.findByText(/Department Step/i)).toBeInTheDocument();
    expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 2');
  });

  it('navigates backward and forward correctly through steps', async () => {
    SetupFormSetup();
    await userEvent.click(screen.getByText(/Next/i));
    expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 2');
    await userEvent.click(screen.getByText(/Next/i));
    expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 3');
    await userEvent.click(screen.getByText(/Back/i));
    expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 2');
    expect(await screen.findByText(/Department Step/i)).toBeInTheDocument();
  });

  it('navigates through all steps up to Complete', async () => {
    render(<SetupForm />);
    await userEvent.click(screen.getByText(/Next/i));
    await userEvent.click(screen.getByText(/Next/i));
    await userEvent.click(screen.getByText(/Next/i));
    await userEvent.click(screen.getByText(/Next/i));
    await userEvent.click(screen.getByText(/Next/i));

    expect(await screen.findByText(/Complete Step/i)).toBeInTheDocument();
  });
});
