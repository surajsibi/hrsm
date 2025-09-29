import type { JSX, ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className="flex h-screen w-full justify-center items-center gap-4 bg-gradient-secondry">
      {children}
    </div>
  );
};

export default AuthLayout;
