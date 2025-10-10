import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Organization from '@/features/setup/Organization';

describe('Organization  ', () => {
  it('should render the component', () => {
    render(<Organization onNext={jest.fn()} />);
    expect(screen.getByText('Organization')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Building/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Company Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Type/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/company@example.com/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Email/i)).toBeInTheDocument();
    expect(screen.getByTestId('Mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+1 (234) 567 8901')).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByTestId('Phone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://www.company.com')).toBeInTheDocument();
    expect(screen.getByLabelText(/Website/i)).toBeInTheDocument();
    expect(screen.getByTestId('Globe')).toBeInTheDocument();
    expect(screen.getByText(/Select Company size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Size/i)).toBeInTheDocument();
    expect(screen.getByTestId('Users')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter company address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Address/i)).toBeInTheDocument();
    expect(screen.getByTestId('MapPin')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Brief description about your company/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Skip This Step/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Organization/i })).toBeInTheDocument();
  });

  it('give error is required field are empty', async () => {
    render(<Organization onNext={jest.fn()} />);
    const companyName = screen.getByPlaceholderText(/Enter company name/i);

    await userEvent.click(companyName);
    await userEvent.tab();
    expect(screen.getByText(/Company name is required/i)).toBeInTheDocument();

    const companyType = screen.getByText(/Select Company Type/i);

    await userEvent.click(companyType);
    await userEvent.tab();
    expect(screen.getByText(/Company type is required/i)).toBeInTheDocument();

    const companyEmail = screen.getByPlaceholderText(/company@example.com/);

    await userEvent.click(companyEmail);
    await userEvent.tab();
    expect(screen.getByText(/Company email is required/i));

    const phoneNumber = screen.getByPlaceholderText('+1 (234) 567 8901');

    await userEvent.click(phoneNumber);
    await userEvent.tab();
    expect(screen.getByText(/Phone number is required/i));

    const website = screen.getByPlaceholderText('https://www.company.com');

    await userEvent.type(website, 'company');
    expect(screen.getByText(/Invalid URL/i));

    const Address = screen.getByPlaceholderText(/Enter company address/i);

    await userEvent.click(Address);
    await userEvent.tab();
    expect(screen.getByText(/Company address is required/i)).toBeInTheDocument();
  });

  it('submit the form', async () => {
    const onNext = jest.fn();

    render(<Organization onNext={onNext} />);
    const companyName = screen.getByPlaceholderText(/Enter company name/i);

    await userEvent.type(companyName, 'companyName');

    const companyType = screen.getByText(/Select Company Type/i);

    await userEvent.click(companyType);
    await userEvent.click(screen.getByText('Private Limited'));

    const companyEmail = screen.getByPlaceholderText(/company@example.com/);

    await userEvent.type(companyEmail, 'company@example.com');

    const phoneNumber = screen.getByPlaceholderText('+1 (234) 567 8901');

    await userEvent.type(phoneNumber, '1234567890');

    const Address = screen.getByPlaceholderText(/Enter company address/i);

    await userEvent.type(Address, 'company address');

    const button = screen.getByRole('button', { name: /Create Organization/i });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    await userEvent.click(button);

    await userEvent.click(screen.getByRole('button', { name: /Skip This Step/i }));

    expect(onNext).toHaveBeenCalledTimes(2);
  });
});
