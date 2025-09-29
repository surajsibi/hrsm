import type { JSX, ReactNode } from 'react';

const ProtectedLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return <>{children}</>;
};

export default ProtectedLayout;
