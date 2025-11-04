import { render, screen } from '@testing-library/react';
import { HeaderLogo } from '@/components/ui/HeaderLogos';

describe('HeaderLogo', () => {
  it('should render the component', () => {
    render(<HeaderLogo icon="ArrowLeft" />);
    const icon = screen.getByLabelText('ArrowLeft');
    expect(icon).toBeInTheDocument();
    const parent = icon.parentElement;
    expect(parent).toHaveClass(
      'bg-gradient-primary rounded-full h-16 w-16 justify-center items-center mx-auto flex'
    );
  });

  it('should render with intent', () => {
    render(<HeaderLogo variant="square" icon="ArrowLeft" />);
    const icon = screen.getByLabelText('ArrowLeft');
    expect(icon).toBeInTheDocument();
    const parent = icon.parentElement;
    expect(parent).toHaveClass('bg-gradient-primary ');
  });

  it('should render with custom classname', () => {
    render(<HeaderLogo className="w-24" icon="ArrowLeft" />);
    const icon = screen.getByLabelText('ArrowLeft');
    expect(icon).toBeInTheDocument();
    const parent = icon.parentElement;
    expect(parent).toHaveClass('w-24');
  });

  it('should render with children', () => {
    render(<HeaderLogo icon="ArrowLeft">Children</HeaderLogo>);
    const icon = screen.getByLabelText('ArrowLeft');
    expect(icon).toBeInTheDocument();
    const parent = icon.parentElement;
    expect(parent).toHaveClass(
      'bg-gradient-primary rounded-full h-16 w-16 justify-center items-center mx-auto flex'
    );

    expect(screen.getByText('Children')).toBeInTheDocument();
  });

  it('should render with ...props', () => {
    render(
      <HeaderLogo color="red" icon="ArrowLeft">
        Children
      </HeaderLogo>
    );
    const icon = screen.getByLabelText('ArrowLeft');
    expect(icon).toBeInTheDocument();
    const parent = icon.parentElement;
    expect(parent).toHaveClass(
      'bg-gradient-primary rounded-full h-16 w-16 justify-center items-center mx-auto flex'
    );
    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(parent).toHaveAttribute('color', 'red');
  });
});
