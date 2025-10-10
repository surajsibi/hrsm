import { render, screen } from '@testing-library/react';

import Complete from '@/features/setup/Complete';

describe('Complete', () => {
  it('should render', () => {
    render(<Complete />);
    expect(screen.getByTestId('Check')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Setup Completed', level: 1 })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Go to Dashboard' })).toBeInTheDocument();
  });
});
