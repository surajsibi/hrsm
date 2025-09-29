import { BellDot, Globe, Mail } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

import type { JSX } from 'react';

const MainNavbar = (): JSX.Element => {
  return (
    <div className="flex justify-between p-4">
      <div className="text-3xl font-bold">Hello Thomas</div>
      <div className="flex gap-8 items-center">
        <Input type="text" placeholder="Search Here..." className="w-auto" />
        <div className="flex items-center justify-center gap-2">
          <Globe />
          English
        </div>
        <div>
          <Mail />
        </div>
        <div>
          <BellDot />
        </div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>Jhon Smith</div>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
