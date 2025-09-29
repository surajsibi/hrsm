import MainNavbar from '@/components/navbar/main-navbar';

import type { JSX, ReactNode } from 'react';

const PublicLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <div className="p-6">
      <MainNavbar />
      {children}
    </div>
  );
};

export default PublicLayout;
