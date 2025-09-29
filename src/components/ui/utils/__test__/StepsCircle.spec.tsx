import { render, screen } from '@testing-library/react';
import { StepsCircle } from '../StepsCircle';

describe('StepsCircle', () => {
  describe('primary variant', () => {
    const steps = [1, 2, 3, 4];

    it('renders all steps', () => {
      render(<StepsCircle steps={steps} variant="primary" currentStep={1} />);
      steps.forEach(step => {
        expect(screen.getByText(step.toString())).toBeInTheDocument();
      });
    });

    it('applies active style to current step', () => {
      render(<StepsCircle steps={steps} variant="primary" currentStep={2} />);
      const activeStep = screen.getByText('2').parentElement;
      expect(activeStep).toHaveClass('bg-gradient-primary');
    });

    it('applies completed style to previous steps', () => {
      render(<StepsCircle steps={steps} variant="primary" currentStep={3} />);
      const completedStep = screen.getByText('1').parentElement;
      expect(completedStep).toHaveClass('bg-green-500');
    });

    it('applies pending style to upcoming steps', () => {
      render(<StepsCircle steps={steps} variant="primary" currentStep={2} />);
      const pendingStep = screen.getByText('4').parentElement;
      expect(pendingStep).toHaveClass('bg-gray-200');
    });
  });

  describe('default variant', () => {
    const labels = ['Org', 'Dept', 'Users'];

    it('renders step numbers with labels', () => {
      render(<StepsCircle secondarySteps={labels} currentStep={1} />);
      labels.forEach(label => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('applies active style to current step', () => {
      render(<StepsCircle secondarySteps={labels} currentStep={2} />);
      const activeStep = screen.getByText('2').parentElement;
      expect(activeStep).toHaveClass('bg-gradient-primary');
    });

    it('applies pending style to future step', () => {
      render(<StepsCircle secondarySteps={labels} currentStep={1} />);
      const pendingStep = screen.getByText('3').parentElement;
      expect(pendingStep).toHaveClass('bg-gray-200');
    });
  });
});
