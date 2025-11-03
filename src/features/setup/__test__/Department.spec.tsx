// __tests__/Department.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Department } from '@/features/setup/Department';

describe('features / setup / Department', () => {
  const user = userEvent.setup();
  const DepartmentSetup = (props = {}) => {
    const defaultProps = {
      onNext: jest.fn(),
      onPrev: jest.fn(),
    };

    render(<Department {...defaultProps} {...props} />);

    const customDeparmentNameInput = screen.getByRole('textbox', {
      name: '',
    });

    const addCustomDepartmentButton = screen.getByRole('button', {
      name: /Add department/i,
    });

    const hrDeparmentButton = screen.getByRole('button', { name: /Human Resources/i });
    const skipButton = screen.getByRole('button', { name: /Skip This Step/i });
    const prevButton = screen.getByRole('button', { name: /Previous Step/i });
    const continueButton = screen.getByRole('button', { name: /Continue/i });
    const lineBreak = screen.getAllByRole('separator');

    return {
      customDeparmentNameInput,
      addCustomDepartmentButton,
      skipButton,
      prevButton,
      continueButton,
      lineBreak,
      hrDeparmentButton,
      ...defaultProps,
    };
  };

  it('renders all UI elements correctly', () => {
    const {
      customDeparmentNameInput,
      addCustomDepartmentButton,
      skipButton,
      prevButton,
      continueButton,
      lineBreak,
      hrDeparmentButton,
    } = DepartmentSetup();

    expect(screen.getByRole('heading', { name: 'Departments', level: 3 }));
    expect(screen.getByRole('heading', { name: 'Quick Add Departments', level: 3 }));
    expect(screen.getByRole('heading', { name: 'Add Custom Departments', level: 3 }));
    expect(customDeparmentNameInput).toBeInTheDocument();
    expect(addCustomDepartmentButton).toBeInTheDocument();
    expect(addCustomDepartmentButton).toBeDisabled();
    expect(
      screen.queryByRole('heading', { name: 'Added Departments', level: 3 })
    ).not.toBeInTheDocument();

    expect(lineBreak).toHaveLength(2);
    for (const separator of lineBreak) expect(separator).toBeInTheDocument();

    expect(skipButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
    expect(hrDeparmentButton).toBeInTheDocument();

    const deleteCustomDepartmentButton = screen.queryByRole('button', {
      name: /Delete section/i,
    });

    expect(deleteCustomDepartmentButton).not.toBeInTheDocument();
  });

  it('quick add departments', async () => {
    const { hrDeparmentButton } = DepartmentSetup();

    expect(hrDeparmentButton).toBeInTheDocument();

    await user.click(hrDeparmentButton);

    expect(
      screen.getByRole('heading', { name: /Added Departments/i, level: 3 })
    ).toBeInTheDocument();

    const deleteCustomDepartmentButton = await screen.findByRole('button', {
      name: /Delete section/i,
    });

    expect(deleteCustomDepartmentButton).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /Human Resources/i })).toBeInTheDocument();
    expect(screen.getByText(/1 department/i)).toBeInTheDocument();
  });

  it('adding and deleting custom department ', async () => {
    const { customDeparmentNameInput, addCustomDepartmentButton } = DepartmentSetup();

    expect(customDeparmentNameInput).toBeInTheDocument();
    expect(addCustomDepartmentButton).toBeInTheDocument();

    expect(addCustomDepartmentButton).toBeDisabled();

    await user.type(customDeparmentNameInput, 'custom department');

    expect(addCustomDepartmentButton).not.toBeDisabled();

    await user.click(addCustomDepartmentButton);

    expect(
      screen.getByRole('heading', { name: /Added Departments/i, level: 3 })
    ).toBeInTheDocument();

    const deleteCustomDepartmentButton = await screen.findByRole('button', {
      name: /Delete section/i,
    });

    expect(deleteCustomDepartmentButton).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /custom department/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText(/1 department/i)).toBeInTheDocument();

    await user.click(deleteCustomDepartmentButton);

    expect(
      screen.queryByRole('heading', { name: /custom department/i, level: 1 })
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/1 department/i)).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: /Added Departments/i, level: 3 })
    ).not.toBeInTheDocument();

    expect(screen.queryByRole('button', { name: /Delete section/i })).not.toBeInTheDocument();

    expect(addCustomDepartmentButton).toBeDisabled();
  });

  it('add multiple custom department', async () => {
    const { customDeparmentNameInput, addCustomDepartmentButton } = DepartmentSetup();

    expect(customDeparmentNameInput).toBeInTheDocument();
    expect(addCustomDepartmentButton).toBeInTheDocument();

    expect(addCustomDepartmentButton).toBeDisabled();

    await user.type(customDeparmentNameInput, 'custom department 1');

    expect(addCustomDepartmentButton).not.toBeDisabled();

    await user.click(addCustomDepartmentButton);
    await user.type(customDeparmentNameInput, 'custom department 2');

    expect(addCustomDepartmentButton).not.toBeDisabled();

    await user.click(addCustomDepartmentButton);

    expect(
      screen.getByRole('heading', { name: /Added Departments/i, level: 3 })
    ).toBeInTheDocument();

    const deleteCustomDepartmentButton = await screen.findAllByRole('button', {
      name: /Delete section/i,
    });

    expect(deleteCustomDepartmentButton).toHaveLength(2);

    expect(
      screen.queryByRole('heading', { name: /custom department 1/i, level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /custom department 2/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText(/2 departments/i)).toBeInTheDocument();

    await user.click(deleteCustomDepartmentButton[0]);

    expect(
      screen.queryByRole('heading', { name: /custom department 1/i, level: 1 })
    ).not.toBeInTheDocument();

    expect(screen.getByText(/1 department/i)).toBeInTheDocument();

    await user.click(deleteCustomDepartmentButton[0]);

    expect(
      screen.queryByRole('heading', { name: /custom department 2/i, level: 1 })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: /Added Departments/i, level: 3 })
    ).not.toBeInTheDocument();

    expect(screen.queryByRole('button', { name: /Delete section/i })).not.toBeInTheDocument();

    expect(addCustomDepartmentButton).toBeDisabled();
  });

  it('testing all buttons ', async () => {
    const onNext = jest.fn();
    const onPrev = jest.fn();
    const { skipButton, prevButton, continueButton } = DepartmentSetup({ onNext, onPrev });

    expect(skipButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();

    await user.click(skipButton);
    expect(onNext).toHaveBeenCalledTimes(1);

    await user.click(continueButton);
    expect(onNext).toHaveBeenCalledTimes(2);

    await user.click(prevButton);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });
});
