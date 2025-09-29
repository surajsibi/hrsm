import { Newspaper } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import type { JSX } from 'react';

const PublicHomePage = (): JSX.Element => {
  return (
    <div className="flex flex-col  gap-10">
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-6xl">Engage, appraise and delight every employee!</h1>
        <h2 className="text-3xl">The most trusted full-suite HRMS for your people operations</h2>
      </div>
      <div className="flex justify-around gap-24 px-40 pt-6">
        <Card className="w-48 bg-[rgb(238,250,244)]">
          <CardContent>
            <div className="text-xl font-bold">25 +</div>
            <div className="text-lg font-bold">Countries</div>
          </CardContent>
        </Card>
        <Card className="w-48 bg-[rgb(230,255,255)]">
          <CardContent>
            <div className="text-xl font-bold">27,000+</div>
            <div className="text-lg font-bold">Companies</div>
          </CardContent>
        </Card>
        <Card className="w-48 bg-[rgb(255,248,230)]">
          <CardContent>
            <div className="text-xl font-bold">25,00,000+</div>
            <div className="text-lg font-bold">Users</div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center gap-6 pt-13">
        <Button className="h-15 rounded-full text-lg bg-[rgb(49,0,82)] hover:bg-[rgb(152,14,204)]">
          Start a greytHR Free Account
        </Button>
        <Button className="bg-white border-3 border-purple-800 text-purple-800 rounded-full w-40 h-15 text-lg hover:bg-purple-50">
          Talk to Us!
        </Button>
      </div>
      <div className="flex justify-center">
        <Image src="/landingpage.avif" alt="Landing Page" width={1800} height={1000} />
      </div>
      <div className="flex flex-col items-center gap-6">
        <span className="flex text-6xl gap-2">
          Modern <h1 className="text-[#a338d1]">HR and Payroll </h1>are Complex
        </span>
        <span className="text-2xl">
          greytHR solves some of the most common HR and Payroll issues that slow down your business.
        </span>
      </div>
      <div className="">
        <Card className="w-1/5 h-72 bg-[rgb(238,250,244)]">
          <CardContent className="space-y-10 ">
            <div className="pl-1">
              <Newspaper className="bg-[#58C995] rounded-full w-[50px] h-[50px] p-3 text-white" />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                You don’t have an HRMS, and running HR ops on Sheets
              </div>
              <div className="text-xl">
                Use one single app for all HR and Payroll Processes, including workforce management,
                employee relations, leave and attendance
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicHomePage;
