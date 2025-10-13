import { cn } from '@/utils';
import { HTMLAttributes } from 'react';
import { Icon } from '@/components/Icons/Icon';

interface StepsCircleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * List of steps.
   * - For `primary`, expects numbers.
   * - For `default`, expects labels.
   */
  steps?: (number | string)[];

  /** Current active step (1-based index). */
  currentStep?: number;

  /** Which style variant to render. */
  variant?: 'primary' | 'default';

  /** Labels for default variant (if using strings). */
  secondarySteps?: string[];
}

/**
 * StepsCircle Component
 *
 * Displays step progress indicators in two variants:
 * - `primary`: simple circles with connectors
 * - `default`: progress bar with step labels
 */
export function StepsCircle({
  steps,
  currentStep = 1,
  variant = 'default',
  secondarySteps = ['Organization', 'Departments', 'Designations', 'Shifts', 'Users', 'Complete'],
  ...props
}: StepsCircleProps) {
  if (variant === 'primary') {
    return (
      <div className="flex mt-6" {...props}>
        {steps?.map(step => (
          <div key={step} className="w-full flex items-center justify-center ">
            <div
              className={cn(
                'w-8 h-8 flex-none rounded-full flex items-center justify-center',
                currentStep === (step as number) && 'bg-gradient-primary text-white',
                currentStep > (step as number) && 'bg-green-500 text-white',
                currentStep < (step as number) && 'bg-gray-200 text-gray-500'
              )}
            >
              <p className="text-sm font-medium">{step}</p>
            </div>
            {steps.length > (step as number) && (
              <p
                className={cn(
                  'h-0.5 w-8 bg-green-400 transition-all duration-300',
                  currentStep <= (step as number) && 'bg-transparent'
                )}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center gap-4" {...props}>
      <div className="w-[100%] h-2 rounded-full border border-gray-200 bg-gray-200">
        <div
          className="h-full bg-gradient-primary rounded-full transition-all"
          style={{
            width: `${(currentStep / secondarySteps.length) * 100}%`,
          }}
        />
      </div>

      <div className="flex w-full justify-between items-center">
        {secondarySteps.map((step, index) => (
          <div key={step} className="w-full flex flex-col gap-2 items-center justify-center">
            <div
              className={cn(
                'w-8 h-8 flex-none rounded-full flex items-center justify-center',
                currentStep === index + 1 && 'bg-gradient-primary text-white',
                currentStep > index + 1 && 'bg-green-500 text-white',
                currentStep < index + 1 && 'bg-gray-200 text-gray-500'
              )}
            >
              <p className="text-sm font-medium">
                {currentStep > index + 1 ? (
                  <Icon name="Check" color="white" variant="header" />
                ) : (
                  index + 1
                )}
              </p>
            </div>
            <p className="text-xs text-blue-500 text-center font-medium">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
