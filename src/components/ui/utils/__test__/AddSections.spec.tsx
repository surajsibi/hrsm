import { AddedSection } from '@/components/ui/utils/AddSections';
import { Icon } from '@/components/Icons/Icon';

import { render, screen } from '@testing-library/react';

describe('AddedSection', () => {
  it('should render the component', () => {
    render(<AddedSection />);
    expect(screen.getByText('Quality Assurance')).toBeInTheDocument();
    expect(screen.getByText('Status: ACTIVE')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete section/i })).toBeInTheDocument();
  });

  it('should render with title and description', () => {
    render(<AddedSection title="Developer" description="Status: ACTIVE" />);
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Status: ACTIVE')).toBeInTheDocument();
  });

  it('should render with custom icon', () => {
    const { container } = render(
      <AddedSection icon={<Icon name="Trash2" color="#dc2828" size={16} />} />
    );
    expect(container.querySelector('svg.lucide-trash2')).toBeInTheDocument();
  });

  it('should render with delete button', () => {
    render(<AddedSection onDelete={jest.fn()} />);
    expect(screen.getByRole('button', { name: /delete section/i })).toBeInTheDocument();
  });

  it('delete button click ', () => {
    const onDelete = jest.fn();
    render(<AddedSection onDelete={onDelete} />);
    screen.getByRole('button', { name: /delete section/i }).click();
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
