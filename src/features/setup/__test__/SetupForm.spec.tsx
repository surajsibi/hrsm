import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { ReactNode } from 'react';

// Step components
jest.mock('@/features/setup/Organization', () => ({
  __esModule: true,
  Organization: ({ onNext }: { onNext: () => void }) => (
    <div>
      <p>Organization Step</p>
      <button onClick={onNext}>Next</button>
      <button onClick={onNext}>Skip</button>
    </div>
  ),
}));

jest.mock('@/features/setup/Department', () => ({
  __esModule: true,
  Department: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
    <div>
      <p>Department Step</p>
      <button onClick={onPrev}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

jest.mock('@/features/setup/Designation', () => ({
  __esModule: true,
  Designation: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
    <div>
      <p>Designation Step</p>
      <button onClick={onPrev}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

jest.mock('@/features/setup/Shifts', () => ({
  __esModule: true,
  Shifts: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
    <div>
      <p>Shifts Step</p>
      <button onClick={onPrev}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

jest.mock('@/features/setup/Users', () => ({
  __esModule: true,
  Users: ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
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

// Utility components
jest.mock('@/components/ui/Titles', () => ({
  Title: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
}));
jest.mock('@/components/ui/Descriptions', () => ({
  Description: ({ children }: { children: ReactNode }) => <p>{children}</p>,
}));
jest.mock('@/components/ui/StepsCircle', () => ({
  StepsCircle: ({ currentStep }: { currentStep: number }) => (
    <div data-testid="step-indicator">Step {currentStep}</div>
  ),
}));

// eslint-disable-next-line import/order
import SetupForm from '@/features/setup/SetupForm';

describe('SetupForm', () => {
  const setup = () => {
    render(<SetupForm />);
    const heading = screen.getByRole('heading', { name: /HRMS Setup Wizard/i });
    const description = screen.getByText(/Let's configure your Human Resource Management System/i);

    return { heading, description };
  };

  it('renders Organization step by default', () => {
    const { heading, description } = setup();

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(screen.getByText(/Organization Step/i)).toBeInTheDocument();
    expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 1');
  });

  it('moves to Department when clicking Next from Organization', async () => {
    setup();
    await userEvent.click(screen.getByRole('button', { name: /Next/i }));

    expect(await screen.findByText(/Department Step/i)).toBeInTheDocument();
    expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 2');
  });

  it('navigates forward and backward correctly', async () => {
    setup();
    // Step 1 -> 2 -> 3 -> back -> 2
    await userEvent.click(screen.getByRole('button', { name: /Next/i })); // Org → Dept
    await userEvent.click(screen.getByRole('button', { name: /Next/i })); // Dept → Desig
    expect(await screen.findByText(/Designation Step/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Back/i })); // Desig → Dept
    expect(await screen.findByText(/Department Step/i)).toBeInTheDocument();
    expect(screen.getByTestId('step-indicator')).toHaveTextContent('Step 2');
  });

  it('goes through all steps and reaches Complete', async () => {
    render(<SetupForm />);

    // eslint-disable-next-line no-restricted-syntax
    for (let i = 0; i < 5; i++) {
      await userEvent.click(screen.getByRole('button', { name: /Next/i }));
    }

    expect(await screen.findByText(/Complete Step/i)).toBeInTheDocument();
  });
});
