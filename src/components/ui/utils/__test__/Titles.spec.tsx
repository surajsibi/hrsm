import { render, screen } from '@testing-library/react';
import { Title } from '../Titles';

describe('Title', () => {
  it('should render the component', () => {
    render(<Title>Title</Title>);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
  it('should render with intent', () => {
    render(<Title variant="h1">Title</Title>);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Title')).toHaveClass('text-3xl');
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
  it('should render with intent h2 ', () => {
    render(<Title variant="h2">Title</Title>);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Title')).toHaveClass('text-2xl');
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
  it('should render with intent h3 ', () => {
    render(<Title variant="h3">Title</Title>);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Title')).toHaveClass('text-xl');
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
  it('should render with intent h4 ', () => {
    render(<Title variant="h4">Title</Title>);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Title')).toHaveClass('text-lg');
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
  });
  it('should render with intent h5 ', () => {
    render(<Title variant="h5">Title</Title>);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Title')).toHaveClass('text-base');
    expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();
  });
  it('render with classname', () => {
    render(<Title className="w-24">Title</Title>);
    expect(screen.getByText('Title')).toHaveClass('w-24');
  });
  it('render with ...props', () => {
    render(<Title color="red">Title</Title>);
    expect(screen.getByText('Title')).toHaveAttribute('color', 'red');
  });
});
