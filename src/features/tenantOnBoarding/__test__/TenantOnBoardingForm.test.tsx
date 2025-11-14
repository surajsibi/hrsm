import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TenantOnBoardingForm } from '@/features/tenantOnBoarding/TenantOnBoardingForm';

describe('features / tenantOnBoarding / TenantOnBoardingForm', () => {
  const user = userEvent.setup();
  const TenanOnBoardingFormSetup = () => {
    const componentRender = render(<TenantOnBoardingForm />);
    const firstNameInput = screen.getByRole('textbox', { name: /First Name/i });
    const lastNameInput = screen.getByRole('textbox', { name: /Last Name/i });
    const emailInput = screen.getByRole('textbox', { name: /Email Address/i });
    const phoneInput = screen.getByRole('textbox', { name: /Phone Number/i });
    const companyNameInput = screen.getByRole('textbox', { name: /Company Name/i });
    const privateDatabaseButton = screen.getByRole('radio', { name: /Private Database/i });
    const sharedDatabaseButton = screen.getByRole('radio', { name: /Shared Database/i });
    const dedicatedDatabaseButton = screen.getByRole('radio', { name: /Dedicated Database/i });
    const submitButton = screen.getByRole('button', { name: /Complete Setup/i });

    return {
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      companyNameInput,
      privateDatabaseButton,
      sharedDatabaseButton,
      dedicatedDatabaseButton,
      submitButton,
      ...componentRender,
    };
  };

  const databaseSetup = () => {
    const databaseHostInput = screen.getByRole('textbox', { name: /Database Host/i });
    const databasePortInput = screen.getByRole('textbox', { name: /Database Port/i });
    const databaseNameInput = screen.getByRole('textbox', { name: /Database Name/i });
    const databaseUsernameInput = screen.getByRole('textbox', { name: /Database Username/i });
    const databasePasswordInput = screen.getByPlaceholderText(/Database Password/i);

    return {
      databaseHostInput,
      databasePortInput,
      databaseNameInput,
      databaseUsernameInput,
      databasePasswordInput,
    };
  };

  it('should render the component', () => {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      companyNameInput,
      privateDatabaseButton,
      sharedDatabaseButton,
      dedicatedDatabaseButton,
      submitButton,
    } = TenanOnBoardingFormSetup();

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(companyNameInput).toBeInTheDocument();

    expect(privateDatabaseButton).toBeInTheDocument();
    expect(sharedDatabaseButton).toBeInTheDocument();
    expect(dedicatedDatabaseButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('render database form when private database is selected', async () => {
    const { privateDatabaseButton } = TenanOnBoardingFormSetup();

    await user.click(privateDatabaseButton);

    const {
      databaseHostInput,
      databasePortInput,
      databaseNameInput,
      databaseUsernameInput,
      databasePasswordInput,
    } = databaseSetup();

    expect(databaseHostInput).toBeInTheDocument();
    expect(databasePortInput).toBeInTheDocument();
    expect(databaseNameInput).toBeInTheDocument();
    expect(databaseUsernameInput).toBeInTheDocument();
    expect(databasePasswordInput).toBeInTheDocument();
  });

  it('show error if inputs are empty', async () => {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      companyNameInput,
      privateDatabaseButton,
      submitButton,
    } = TenanOnBoardingFormSetup();

    await user.click(firstNameInput);
    await user.tab();

    expect(await screen.findByText(/First Name is required/i)).toBeInTheDocument();

    await user.click(lastNameInput);
    await user.tab();

    expect(await screen.findByText(/Last Name is required/i)).toBeInTheDocument();

    await user.click(emailInput);
    await user.tab();

    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();

    await user.type(emailInput, 'test');
    await user.tab();

    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();

    await user.click(phoneInput);
    await user.tab();

    expect(await screen.findByText(/Phone Number is required/i)).toBeInTheDocument();

    await user.type(phoneInput, 'test');
    await user.tab();

    expect(await screen.findByText(/invalid phone number/i)).toBeInTheDocument();

    await user.click(companyNameInput);
    await user.tab();

    expect(await screen.findByText(/Company Name is required/i)).toBeInTheDocument();

    await user.click(privateDatabaseButton);

    const {
      databaseHostInput,
      databasePortInput,
      databaseNameInput,
      databaseUsernameInput,
      databasePasswordInput,
    } = databaseSetup();

    await user.click(databaseHostInput);
    await user.tab();

    expect(await screen.findByText(/Database Host is required/i)).toBeInTheDocument();

    await user.click(databasePortInput);
    await user.tab();

    expect(await screen.findByText(/Database Port is required/i)).toBeInTheDocument();

    await user.click(databaseNameInput);
    await user.tab();

    expect(await screen.findByText(/Database Name is required/i)).toBeInTheDocument();

    await user.click(databaseUsernameInput);
    await user.tab();

    expect(await screen.findByText(/Database Username is required/i)).toBeInTheDocument();

    await user.click(databasePasswordInput);
    await user.tab();

    expect(await screen.findByText(/Database Password is required/i)).toBeInTheDocument();

    expect(submitButton).toBeDisabled();
  });

  it('submit form', async () => {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      companyNameInput,
      privateDatabaseButton,
      submitButton,
    } = TenanOnBoardingFormSetup();

    await user.type(firstNameInput, 'test');
    await user.type(lastNameInput, 'test');
    await user.type(emailInput, 'test@gmail.com');
    await user.type(phoneInput, '8879311734');
    await user.type(companyNameInput, 'test');

    await user.click(privateDatabaseButton);

    const {
      databaseHostInput,
      databasePortInput,
      databaseNameInput,
      databaseUsernameInput,
      databasePasswordInput,
    } = databaseSetup();

    await user.type(databaseHostInput, 'localhost');
    await user.type(databasePortInput, '5432');
    await user.type(databaseNameInput, 'test');
    await user.type(databaseUsernameInput, 'test');
    await user.type(databasePasswordInput, 'test');

    expect(submitButton).not.toBeDisabled();
    const consoleSpy = jest.spyOn(console, 'log');

    await user.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
    expect(consoleSpy).toHaveBeenCalledWith({
      firstName: 'test',
      lastName: 'test',
      email: 'test@gmail.com',
      phoneNumber: '8879311734',
      companyName: 'test',
      databaseType: 'private',
      databaseHost: 'localhost',
      databasePort: '5432',
      databaseName: 'test',
      databaseUsername: 'test',
      databasePassword: 'test',
    });
  });
});
