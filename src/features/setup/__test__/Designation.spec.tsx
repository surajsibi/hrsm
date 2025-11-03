import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Designation } from '@/features/setup/Designation';

describe('features / setup / Designation', () => {
  const user = userEvent.setup();
  const DesignationSetup = (props = {}) => {
    const defaultProps = {
      onNext: jest.fn(),
      onPrev: jest.fn(),
      apiDepartments: ['Legal & Compliance', 'Quality Assurance'],
    };

    render(<Designation {...defaultProps} {...props} />);

    const customDesignationInput = screen.getByRole('textbox', {
      name: /Designation Name/i,
    });

    const selectDepartmentDropDown = screen.getByRole('combobox', {
      name: 'Department *',
    });

    const addDesignationButton = screen.getByRole('button', {
      name: /Add designation/i,
    });

    const skipButton = screen.getByRole('button', { name: /Skip This Step/i });
    const prevButton = screen.getByRole('button', { name: /Previous Step/i });
    const continueButton = screen.getByRole('button', { name: /Continue/i });
    const legalCounselDesignationButton = screen.getByRole('button', {
      name: /Legal Counsel/i,
    });

    const qaLeadDesignationButton = screen.getByRole('button', {
      name: /QA Lead/i,
    });

    return {
      customDesignationInput,
      selectDepartmentDropDown,
      addDesignationButton,
      skipButton,
      prevButton,
      continueButton,
      legalCounselDesignationButton,
      qaLeadDesignationButton,
      ...props,
      ...defaultProps,
    };
  };

  it('renders all UI elements correctly', () => {
    const {
      customDesignationInput,
      selectDepartmentDropDown,
      addDesignationButton,
      skipButton,
      prevButton,
      continueButton,
      legalCounselDesignationButton,
      qaLeadDesignationButton,
    } = DesignationSetup();

    expect(screen.getByRole('heading', { name: 'Designations', level: 3 }));
    expect(screen.getByRole('heading', { name: 'Quick by Department', level: 3 }));

    expect(customDesignationInput).toBeInTheDocument();
    expect(selectDepartmentDropDown).toBeInTheDocument();
    expect(addDesignationButton).toBeInTheDocument();
    expect(skipButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
    expect(legalCounselDesignationButton).toBeInTheDocument();
    expect(qaLeadDesignationButton).toBeInTheDocument();
  });

  it('add and remove  designation , quick designation ', async () => {
    const { legalCounselDesignationButton, qaLeadDesignationButton } = DesignationSetup();

    expect(legalCounselDesignationButton).toBeInTheDocument();
    expect(qaLeadDesignationButton).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: 'Added Designations', level: 3 })
    ).not.toBeInTheDocument();

    await user.click(legalCounselDesignationButton);

    expect(
      screen.getByRole('heading', { name: 'Added Designations', level: 3 })
    ).toBeInTheDocument();

    expect(screen.getByText(/1 designation/i));

    await user.click(qaLeadDesignationButton);

    expect(screen.getByRole('heading', { name: /Legal Counsel/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /QA Lead/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/2 designation/i)).toBeInTheDocument();

    const deleteDesignationButton = await screen.findAllByRole('button', {
      name: /Delete section/i,
    });

    expect(deleteDesignationButton).toHaveLength(2);

    await user.click(deleteDesignationButton[0]);

    expect(
      screen.queryByRole('heading', { name: /Legal Counsel/i, level: 1 })
    ).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /QA Lead/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/1 designation/i)).toBeInTheDocument();

    await user.click(deleteDesignationButton[0]);

    expect(screen.queryByRole('heading', { name: /QA Lead/i, level: 1 })).not.toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: 'Added Designations', level: 3 })
    ).not.toBeInTheDocument();
  });

  it('add and remove  designation , custom designation ', async () => {
    const { customDesignationInput, addDesignationButton, selectDepartmentDropDown } =
      DesignationSetup();

    expect(customDesignationInput).toBeInTheDocument();
    expect(selectDepartmentDropDown).toBeInTheDocument();
    expect(addDesignationButton).toBeDisabled();
    expect(addDesignationButton).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: 'Added Designations', level: 3 })
    ).not.toBeInTheDocument();

    await user.type(customDesignationInput, 'custom designation');

    await user.click(selectDepartmentDropDown);

    await user.click(screen.getByRole('option', { name: 'Legal & Compliance' }));

    expect(addDesignationButton).not.toBeDisabled();

    await user.click(addDesignationButton);

    expect(screen.getByText(/1 designation/i)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: 'Added Designations', level: 3 })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /custom designation/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText(/1 designation/i)).toBeInTheDocument();

    const deleteDesignationButton = await screen.findByRole('button', {
      name: /Delete section/i,
    });

    expect(deleteDesignationButton).toBeInTheDocument();

    await user.click(deleteDesignationButton);

    expect(
      screen.queryByRole('heading', { name: /custom designation/i, level: 1 })
    ).not.toBeInTheDocument();

    expect(screen.queryByText(/1 designation/i)).not.toBeInTheDocument();
  });

  it('test case for buttons', async () => {
    const onNext = jest.fn();
    const onPrev = jest.fn();
    const { skipButton, prevButton, continueButton } = DesignationSetup({ onNext, onPrev });

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
