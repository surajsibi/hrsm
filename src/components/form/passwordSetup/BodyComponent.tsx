import ResetPassword from '@/components/form/passwordSetup/ResetEmail';
import SetNewPassword from '@/components/form/passwordSetup/SetNewPassword';
import VerifyEmail from '@/components/form/passwordSetup/VerifyEmail';

import type { Dispatch, JSX, SetStateAction } from 'react';

export default function BodyComponent({
  currentStep,
  setCurrentStep,
}: {
  currentStep?: number | null;
  setCurrentStep?: Dispatch<SetStateAction<number | null>>;
}): JSX.Element {
  const renderStep = () => {
    if (currentStep && setCurrentStep) {
      switch (currentStep) {
        case 1: {
          return <ResetPassword onNext={() => setCurrentStep(2)} />;
        }
        case 2: {
          return <VerifyEmail onNext={() => setCurrentStep(3)} onPrev={() => setCurrentStep(1)} />;
        }
        case 3: {
          return <SetNewPassword />;
        }
        default: {
          return null;
        }
      }
    }

    return <SetNewPassword />;
  };

  return (
    <div className="space-y-4 backdrop-blur-sm shadow-lg text-card-foreground bg-card rounded-lg mt-6 p-6 pt-0">
      {renderStep()}
    </div>
  );
}
