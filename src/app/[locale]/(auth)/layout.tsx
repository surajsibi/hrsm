import constants from '@/constants';

import type { JSX, ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  const { APP_NAME } = constants;

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center gap-4 bg-gradient-secondry">
      {children}
      <footer className="text-paragraph text-center ">&copy;{APP_NAME} All Rights Reserved</footer>
    </div>
  );
};

export default AuthLayout;
