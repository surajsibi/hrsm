import { AddShift } from '../AddShift';

import { render, screen, fireEvent } from '@testing-library/react';

describe('AddShift', () => {
  it('should render the component', () => {
    render(
      <AddShift
        title="Title"
        workType="Work Type"
        startingTime={9}
        endingTime={16}
        days={['Monday', 'Tuesday']}
      />
    );

    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/work type/i)).toBeInTheDocument();
    expect(screen.getByText(/9/i)).toBeInTheDocument();
    expect(screen.getByText(/4/i)).toBeInTheDocument();
    expect(screen.getByText(/7h/i)).toBeInTheDocument();
    expect(screen.getByText(/monday/i)).toBeInTheDocument();
  });

  it('should call handleAddShift when button is clicked', () => {
    const handleAddShift = jest.fn();

    render(
      <AddShift
        title="Title"
        workType="Work Type"
        startingTime={9}
        endingTime={16}
        handleAddShift={handleAddShift}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /add shift/i }));

    expect(screen.getByRole('button', { name: /add shift/i })).toBeInTheDocument();
    expect(handleAddShift).toHaveBeenCalledTimes(1);
  });
});
