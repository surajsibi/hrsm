import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TickLabel } from '../TickLabel';

describe('TickLabel', () => {
  it('renders the label text', () => {
    render(<TickLabel>Option 1</TickLabel>);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('renders custom ReactNode as children', () => {
    render(
      <TickLabel>
        <span data-testid="custom-label">Custom Label</span>
      </TickLabel>
    );
    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
  });
});
