import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Organization } from '@/features/setup/Organization';

const setThemeMock = jest.fn();

// Mock Zustand store
jest.mock('@/store/auth.store', () => ({
  useAuthStore: jest.fn(() => ({
    setTheme: setThemeMock,
  })),
}));

// Mock next/image
jest.mock('next/image', () => (props:any ) => {
  return <img {...props} />;
});

// Mock URL.createObjectURL
const createObjectURLMock = jest.fn(() => 'mock-preview-url');
globalThis.URL.createObjectURL = createObjectURLMock;
globalThis.URL.revokeObjectURL = jest.fn();

describe('features / setup / Organization  ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const OrganizationSetup = (props: Partial<{ onNext: () => void }> = {}) => {
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
    const companyAddressInput = screen.getByPlaceholderText(/Enter company address/i);
    const companyDescriptionInput = screen.getByPlaceholderText(
      /Brief description about your company/i
    );
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

  it('updates theme color input and calls setTheme when changed', () => {
    const { createButton } = OrganizationSetup();
    const themeColorInput = screen.getByLabelText(/brand color theme/i);

    expect(themeColorInput).toHaveValue('#367df6');
    fireEvent.change(themeColorInput, { target: { value: '#123abc' } });

    expect(themeColorInput).toHaveValue('#123abc');
    expect(screen.getByText('#123abc')).toBeInTheDocument();
    expect(setThemeMock).toHaveBeenCalledWith('#123abc');
    expect(createButton).toBeDisabled();
  });

  it('shows logo preview and modal when a file is uploaded', async () => {
    OrganizationSetup();
    const logoInput = screen.getByLabelText(/company logo/i);
    const mockFile = new File(['(⌐□_□)'], 'logo.png', { type: 'image/png' });

    await userEvent.upload(logoInput, mockFile);

    expect(createObjectURLMock).toHaveBeenCalledWith(mockFile);
    const previewImage = await screen.findByAltText(/company logo/i);
    expect(previewImage).toBeVisible();

    await userEvent.click(previewImage);

    const modalImage = await screen.findByAltText(/large company logo/i);
    expect(modalImage).toBeVisible();

    await userEvent.click(screen.getByRole('button', { name: 'X' }));
    expect(screen.queryByAltText(/large company logo/i)).not.toBeInTheDocument();
  });
});
