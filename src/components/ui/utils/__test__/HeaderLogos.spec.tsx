import { render, screen } from '@testing-library/react';
import { HeaderLogo } from '../HeaderLogos';

describe('HeaderLogo', () => {
  it('should render the component', () => {
    render(<HeaderLogo icon={<div>Icon</div>} />);
    const icon = screen.getByText('Icon');
    expect(icon).toBeInTheDocument();
    const parent = icon.parentElement;
    expect(parent).toHaveClass(
      'bg-gradient-primary rounded-full h-16 w-16 justify-center items-center mx-auto flex'
    );
  });

  it('should render with intent', () => {
    render(<HeaderLogo variant="square" icon={<div>Icon</div>} />);
    const icon = screen.getByText('Icon');
    expect(icon).toBeInTheDocument();
    const parent = icon.parentElement;
    expect(parent).toHaveClass('bg-gradient-primary ');
  });

  it('should render with custom classname', () => {
    render(<HeaderLogo className="w-24" icon={<div>Icon</div>} />);
    const icon = screen.getByText('Icon');
    expect(icon).toBeInTheDocument();
    const parent = icon.parentElement;
    expect(parent).toHaveClass('w-24');
  });

  it('should render with children', () => {
    render(<HeaderLogo icon={<div>Icon</div>}>Children</HeaderLogo>);
    const icon = screen.getByText('Icon');
    expect(icon).toBeInTheDocument();
    const parent = icon.parentElement;
    expect(parent).toHaveClass(
      'bg-gradient-primary rounded-full h-16 w-16 justify-center items-center mx-auto flex'
    );
    screen.debug();
    expect(screen.getByText('Children')).toBeInTheDocument();
  });

  it('should render with ...props', () => {
    render(
      <HeaderLogo color="red" icon={<div>Icon</div>}>
        Children
      </HeaderLogo>
    );
    const icon = screen.getByText('Icon');
    expect(icon).toBeInTheDocument();
    const parent = icon.parentElement;
    expect(parent).toHaveClass(
      'bg-gradient-primary rounded-full h-16 w-16 justify-center items-center mx-auto flex'
    );
    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(parent).toHaveAttribute('color', 'red');
  });
});
