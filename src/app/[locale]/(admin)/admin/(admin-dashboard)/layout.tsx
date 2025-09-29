import AdminMainSidebar from '@/components/global/admin-main-sidebar';
import MainNavbar from '@/components/navbar/main-navbar';
import { SidebarProvider } from '@/components/ui/sidebar';

import type { JSX, ReactNode } from 'react';

const AdminLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element => {
  return (
    <SidebarProvider>
      <AdminMainSidebar />
      <main className="w-full min-h-screen ">
        <MainNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
