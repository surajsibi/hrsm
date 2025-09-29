import { render, screen } from '@testing-library/react';
import { Tab } from '../Tabs';
import userEvent from '@testing-library/user-event';

describe('Tab', () => {
  it('should render the component', () => {
    render(<Tab>Tab</Tab>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Tab')).toBeInTheDocument();
    expect(screen.getByTestId('Plus')).toBeInTheDocument();
  });
  it('should render with active state', () => {
    render(<Tab active>Tab</Tab>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('X')).toBeInTheDocument();
  });
  it('should render with onClick', async () => {
    const onClick = jest.fn();
    render(<Tab onClick={onClick}>Tab</Tab>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
