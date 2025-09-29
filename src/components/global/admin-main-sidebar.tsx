'use client';

import { type JSX } from 'react';

import DashBoardDropdown from '@/components/global/sidebar-dropdown/dashboard-dropdown';
import HrmDropdown from '@/components/global/sidebar-dropdown/hrm-dropdown';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';

const AdminMainSidebar = (): JSX.Element => {
  return (
    <Sidebar className="h-screen w-64 bg-gray-900" collapsible="icon">
      <SidebarContent>
        <SidebarGroup className="space-y-2">
          <SidebarGroupLabel className="text-gray-400 px-4 text-lg font-semibold">
            MAIN
          </SidebarGroupLabel>

          <SidebarMenu>
            <DashBoardDropdown />
          </SidebarMenu>

          <SidebarMenu>
            <HrmDropdown />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminMainSidebar;
