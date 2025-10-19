import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Organization from '@/features/setup/Organization';

describe('features / setup / Organization  ', () => {
  const OrganizationSetup = (props = {}) => {
    const defaultProps = {
      onNext: jest.fn(),
    };

    render(<Organization {...defaultProps} {...props} />);

    const companyNameInput = screen.getByRole('textbox', { name: /company name/i });
    const companyTypeDropDown = screen.getByRole('combobox', { name: /company type/i });
    const companyEmailInput = screen.getByRole('textbox', { name: /company email/i });
    const companyPhoneInput = screen.getByRole('textbox', { name: /Phone Number/i });
    const companyWebsiteInput = screen.getByRole('textbox', { name: /website/i });
    const companySizeDropDown = screen.getByRole('combobox', { name: /company size/i });
    const companyAddressInput = screen.getByRole('textbox', { name: /company address/i });
    const companyDescriptionInput = screen.getByRole('textbox', {
      name: /company description/i,
    });
    const createButton = screen.getByRole('button', { name: /Create Organization/i });
    const skipButton = screen.getByRole('button', { name: /Skip This Step/i });

    return {
      companyNameInput,
      companyTypeDropDown,
      companyEmailInput,
      companyPhoneInput,
      companyWebsiteInput,
      companySizeDropDown,
      companyAddressInput,
      companyDescriptionInput,
      createButton,
      skipButton,
      ...defaultProps,
    };
  };

  it('should render the component', () => {
    const {
      companyNameInput,
      companyTypeDropDown,
      companyEmailInput,
      companyPhoneInput,
      companyWebsiteInput,
      companySizeDropDown,
      companyAddressInput,
      companyDescriptionInput,
      createButton,
      skipButton,
    } = OrganizationSetup();

    expect(screen.getByRole('heading', { name: 'Organization', level: 3 })).toBeInTheDocument();
    expect(screen.getByText('Company details and information')).toBeInTheDocument();

    expect(companyNameInput).toBeInTheDocument();
    expect(companyTypeDropDown).toBeInTheDocument();
    expect(companyEmailInput).toBeInTheDocument();
    expect(companyPhoneInput).toBeInTheDocument();
    expect(companyWebsiteInput).toBeInTheDocument();
    expect(companySizeDropDown).toBeInTheDocument();
    expect(companyAddressInput).toBeInTheDocument();
    expect(companyDescriptionInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
    expect(skipButton).toBeInTheDocument();
  });

  it('testing for error and button disable  ', async () => {
    const {
      companyNameInput,
      companyTypeDropDown,
      companyEmailInput,
      companyPhoneInput,
      companyWebsiteInput,
      companyAddressInput,
      createButton,
    } = OrganizationSetup();

    expect(createButton).toBeDisabled();

    await userEvent.click(companyNameInput);
    await userEvent.tab();

    expect(await screen.findByText(/company name is required/i)).toBeInTheDocument();

    await userEvent.click(companyTypeDropDown);
    await userEvent.tab();

    expect(await screen.findByText(/company type is required/i)).toBeInTheDocument();

    await userEvent.click(companyEmailInput);
    await userEvent.tab();

    expect(await screen.findByText(/company email is required/i)).toBeInTheDocument();

    await userEvent.type(companyEmailInput, 'test');
    await userEvent.tab();

    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();

    await userEvent.click(companyPhoneInput);
    await userEvent.tab();

    expect(await screen.findByText(/Company Phone Number is required/i)).toBeInTheDocument();

    await userEvent.type(companyWebsiteInput, 'test');
    await userEvent.tab();

    expect(await screen.findByText(/Invalid website URL/i)).toBeInTheDocument();

    await userEvent.click(companyAddressInput);
    await userEvent.tab();

    expect(await screen.findByText(/company address is required/i)).toBeInTheDocument();

    expect(createButton).toBeDisabled();
  });

  it('calls onNext when valid data is submitted', async () => {
    const onNext = jest.fn();
    const {
      companyNameInput,
      companyTypeDropDown,
      companyEmailInput,
      companyPhoneInput,
      companyWebsiteInput,
      companyAddressInput,
      createButton,
    } = OrganizationSetup({ onNext });

    await userEvent.type(companyNameInput, 'companyName');

    await userEvent.click(companyTypeDropDown);
    await userEvent.click(screen.getByRole('option', { name: 'Private Limited' }));

    await userEvent.type(companyEmailInput, 'company@example.com');

    await userEvent.type(companyPhoneInput, '1234567890');

    await userEvent.type(companyWebsiteInput, 'https://www.example.com');

    await userEvent.type(companyAddressInput, '123 Main St');

    expect(createButton).toBeEnabled();
    await userEvent.click(createButton);

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('skip button test case', async () => {
    const onNext = jest.fn();
    const { skipButton } = OrganizationSetup({ onNext });

    await userEvent.click(skipButton);
    expect(onNext).toHaveBeenCalledTimes(1);
  });
  //   const onNext = jest.fn();

  //   render(<Organization onNext={onNext} />);
  //   const companyName = screen.getByPlaceholderText(/Enter company name/i);

  //   await userEvent.type(companyName, 'companyName');

  //   const companyType = screen.getByRole('button', { name: /Company Type/i });

  //   expect(companyType).toBeInTheDocument();

  //   await userEvent.click(companyType);
  //   await userEvent.click(screen.getByRole('option', { name: 'Private Limited' }));

  //   const companyEmail = screen.getByPlaceholderText(/company@example.com/);

  //   expect(companyEmail).toBeInTheDocument();

  //   await userEvent.type(companyEmail, 'company@example.com');

  //   const phoneNumber = screen.getByPlaceholderText('+1 (234) 567 8901');

  //   expect(phoneNumber).toBeInTheDocument();

  //   await userEvent.type(phoneNumber, '1234567890');

  //   const Address = screen.getByPlaceholderText(/Enter company address/i);

  //   expect(Address).toBeInTheDocument();

  //   await userEvent.type(Address, 'company address');

  //   const button = screen.getByRole('button', { name: /Create Organization/i });

  //   expect(button).toBeInTheDocument();
  //   expect(button).toBeEnabled();

  //   await userEvent.click(button);

  //   const skip = screen.getByRole('button', { name: /Skip This Step/i });

  //   expect(skip).toBeInTheDocument();
  //   await userEvent.click(skip);

  //   expect(onNext).toHaveBeenCalledTimes(2);
  // });
});
