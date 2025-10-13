// __tests__/Department.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Department from '@/features/setup/Department';

describe('features / setup / Department', () => {
  const onNext = jest.fn();
  const onPrev = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with all sections', () => {
    render(<Department onNext={onNext} onPrev={onPrev} />);

    // Headers
    expect(screen.getByText('Departments')).toBeInTheDocument();
    expect(screen.getByText(/Quick Add Departments/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Custom Departments/i)).toBeInTheDocument();
    expect(screen.getByText(/Departments help organize your workforce/i)).toBeInTheDocument();

    // Input & buttons
    expect(screen.getByPlaceholderText(/Enter department names/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Skip This Step/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Previous Step/i })).toBeInTheDocument();

    // Quick Add tabs
    const quickAddTabs = [
      'Human Resources',
      'Information Technology',
      'Sales & Marketing',
      'Finance & Accounting',
      'Operations',
      'Customer Service',
      'Research & Development',
      'Legal & Compliance',
      'Administration',
      'Quality Assurance',
    ];

    for (const tab of quickAddTabs) {
      expect(screen.getByText(tab)).toBeInTheDocument();
    }
  });

  it('adds a quick add department when a tab is clicked', async () => {
    render(<Department onNext={onNext} onPrev={onPrev} />);
    const hrTab = screen.getByRole('button', { name: 'Human Resources' });

    await userEvent.click(hrTab);

    expect(screen.getByText(/Added Departments/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Human Resources' })).toBeInTheDocument();
    expect(screen.getByTestId('Trash2')).toBeInTheDocument();

    const addButton = screen.getByRole('button', { name: '' });

    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  it('adds a custom department from input', async () => {
    render(<Department onNext={onNext} onPrev={onPrev} />);
    const input = screen.getByPlaceholderText(/Enter department names/i);
    const addButton = screen.getByRole('button', { name: '' }); // the plus icon button

    await userEvent.type(input, 'Marketing');
    await userEvent.click(addButton);

    // Should show Added Departments section
    expect(screen.getByText(/Added Departments/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Marketing' })).toBeInTheDocument();
    expect(screen.queryByText('1 department')).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  it('adds multiple  custom department from input', async () => {
    render(<Department onNext={onNext} onPrev={onPrev} />);
    const input = screen.getByPlaceholderText(/Enter department names/i);
    const addButton = screen.getByRole('button', { name: '' }); // the plus icon button

    await userEvent.type(input, 'Marketing,Finance');
    await userEvent.click(addButton);

    // Should show Added Departments section
    expect(screen.getByText(/Added Departments/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Marketing' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Finance' })).toBeInTheDocument();
    expect(screen.queryByText('2 departments')).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  it('deletes a department when delete is clicked', async () => {
    render(<Department onNext={onNext} onPrev={onPrev} />);
    const input = screen.getByPlaceholderText(/Enter department names/i);
    const addButton = screen.getByRole('button', { name: '' });

    await userEvent.type(input, 'Marketing');
    await userEvent.click(addButton);

    const deleteButton = screen.getByLabelText(/Delete section/i);

    await userEvent.click(deleteButton);

    expect(screen.queryByText('Marketing')).not.toBeInTheDocument();
    expect(screen.queryByText(/Added Departments/i)).not.toBeInTheDocument();
  });

  it('calls onNext and onPrev when respective buttons clicked', async () => {
    render(<Department onNext={onNext} onPrev={onPrev} />);

    const skipButton = screen.getByRole('button', { name: /Skip This Step/i });

    await userEvent.click(skipButton);
    expect(onNext).toHaveBeenCalledTimes(1);

    const prevButton = screen.getByRole('button', { name: /Previous Step/i });

    await userEvent.click(prevButton);
    expect(onPrev).toHaveBeenCalledTimes(1);

    const continueButton = screen.getByRole('button', { name: /Continue/i });

    await userEvent.click(continueButton);
    expect(onNext).toHaveBeenCalledTimes(2);
  });
});
