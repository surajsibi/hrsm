'use client';

import { type JSX } from 'react';

import { ChevronDown, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DashBoardDropdown = (): JSX.Element => {
  const router = useRouter();
  const handlesumbit = () => {
    router.push('/admin/empdashboard');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full j flex text-lg justify-between  px-4 py-2">
          <div className="flex items-center gap-2">
            <Home />
            Dashboards
          </div>
          <ChevronDown size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full ml-8" align="center">
        <DropdownMenuItem className="pl-6 text-lg">HRM Dashboard</DropdownMenuItem>
        <DropdownMenuItem onClick={handlesumbit} className="pl-6 text-lg">
          Employee Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem className="pl-6 text-lg">CRM Analytics</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashBoardDropdown;
