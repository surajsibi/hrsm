'use client';

import { ChevronDown, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { JSX } from 'react';

const HrmDropdown = (): JSX.Element => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full flex text-lg justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <Users />
            HRM
          </div>
          <ChevronDown size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full  space-y-2 " align="center">
        <DropdownMenuItem className="pl-6 text-lg">Employee</DropdownMenuItem>
        <DropdownMenuItem className="pl-6 text-lg">Employee Profile</DropdownMenuItem>
        <DropdownMenuItem className="pl-6 text-lg">Designations</DropdownMenuItem>
        <DropdownMenuItem className="pl-6 text-lg">Admin Attendance</DropdownMenuItem>
        <DropdownMenuItem className="pl-6 text-lg">Employee Attendance</DropdownMenuItem>
        <DropdownMenuItem className="pl-6 text-lg">Biometric Attendance</DropdownMenuItem>
        <DropdownMenuItem className="pl-6 text-lg">Office Loan</DropdownMenuItem>
        <DropdownMenuItem className="pl-6 text-lg">Personal Loan</DropdownMenuItem>
        <DropdownMenuItem className="pl-6 text-lg">Employee leaves</DropdownMenuItem>
        <DropdownMenuItem className="pl-6 text-lg">Admin leaves</DropdownMenuItem>
        <DropdownMenuItem className="pl-6 text-lg">Holidays</DropdownMenuItem>
        <DropdownMenuItem className="pl-6 text-lg">Time Sheet</DropdownMenuItem>
        <DropdownMenuItem className="pl-6 text-lg">Schedule</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HrmDropdown;
