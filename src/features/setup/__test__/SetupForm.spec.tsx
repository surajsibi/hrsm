import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SetupForm from '@/features/setup/SetupForm';

describe('features / setup / SetupForm', () => {
  it('should render', async () => {
    render(<SetupForm />);
    expect(
      screen.getByRole('heading', { name: 'HRMS Setup Wizard', level: 1 })
    ).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Organization', level: 3 })).toBeInTheDocument();

    const firstStep = screen.getByText('1').parentElement;

    expect(firstStep).toBeInTheDocument();
    expect(firstStep).toHaveClass('bg-gradient-primary text-white');

    const skipButton = screen.getByRole('button', { name: 'Skip This Step' });

    expect(skipButton).toBeInTheDocument();
    await userEvent.click(skipButton);

    expect(screen.getByRole('heading', { name: 'Departments', level: 3 })).toBeInTheDocument();

    const secondStep = screen.getByText('2').parentElement;

    expect(firstStep).toHaveClass('bg-green-500 text-white');

    expect(secondStep).toBeInTheDocument();
    expect(secondStep).toHaveClass('bg-gradient-primary text-white');

    const secondStepSkipButton = screen.getByRole('button', { name: 'Skip This Step' });

    expect(secondStepSkipButton).toBeInTheDocument();
    await userEvent.click(secondStepSkipButton);

    expect(screen.getByRole('heading', { name: 'Designations', level: 3 })).toBeInTheDocument();

    const thridStep = screen.getByText('3').parentElement;

    expect(firstStep).toHaveClass('bg-green-500 text-white');
    expect(secondStep).toHaveClass('bg-green-500 text-white');

    expect(thridStep).toBeInTheDocument();
    expect(thridStep).toHaveClass('bg-gradient-primary text-white');

    const thridStepSkipButton = screen.getByRole('button', { name: 'Skip This Step' });

    expect(thridStepSkipButton).toBeInTheDocument();
    await userEvent.click(thridStepSkipButton);

    expect(screen.getByRole('heading', { name: 'Shifts', level: 3 })).toBeInTheDocument();

    const fouthStep = screen.getByText('4').parentElement;

    expect(firstStep).toHaveClass('bg-green-500 text-white');
    expect(secondStep).toHaveClass('bg-green-500 text-white');
    expect(thridStep).toHaveClass('bg-green-500 text-white');

    expect(fouthStep).toBeInTheDocument();
    expect(fouthStep).toHaveClass('bg-gradient-primary text-white');

    const fouthStepSkipButton = screen.getByRole('button', { name: 'Skip This Step' });

    expect(fouthStepSkipButton).toBeInTheDocument();
    await userEvent.click(fouthStepSkipButton);

    expect(screen.getByRole('heading', { name: 'Users', level: 3 })).toBeInTheDocument();

    const fifthStep = screen.getByText('5').parentElement;

    expect(firstStep).toHaveClass('bg-green-500 text-white');
    expect(secondStep).toHaveClass('bg-green-500 text-white');
    expect(thridStep).toHaveClass('bg-green-500 text-white');
    expect(fouthStep).toHaveClass('bg-green-500 text-white');

    expect(fifthStep).toBeInTheDocument();
    expect(fifthStep).toHaveClass('bg-gradient-primary text-white');

    const fifthStepSkipButton = screen.getByRole('button', { name: 'Skip This Step' });

    expect(fifthStepSkipButton).toBeInTheDocument();
    await userEvent.click(fifthStepSkipButton);

    expect(screen.getByRole('heading', { name: 'Setup Completed', level: 1 })).toBeInTheDocument();

    const DashboardButton = screen.getByRole('button', { name: 'Go to Dashboard' });

    expect(DashboardButton).toBeInTheDocument();
  });
});
