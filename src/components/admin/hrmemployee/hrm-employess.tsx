'use client';

import { type JSX, useState } from 'react';

import { Facebook, Globe, Linkedin, X, Youtube } from 'lucide-react';
import Image from 'next/image';
import { type SingleValue } from 'react-select';
import AsyncReactSelect from 'react-select/async';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const employees = [
  {
    name: 'Naira Muskan',
    title: 'Chief Executive Officer',
    image: '/avatar1.png',
  },
  {
    name: 'Emily Johnson',
    title: 'Chief Innovation Officer',
    image: '/avatar2.png',
  },
  {
    name: 'Jessica Miller',
    title: 'Product Manager',
    image: '/avatar3.png',
  },
];

const data = ['ITD', 'TD', 'SD', 'NPD', 'SAD', 'DMD', 'SSD', 'WDD', 'PMO', 'ITSP', 'CD'];
const options = data.map(item => ({ value: item, label: item }));

interface OptionType {
  value: string;
  label: string;
}

const HrmEmployee = (): JSX.Element => {
  const [selected, setSelected] = useState<SingleValue<OptionType>>(null);

  const loadOptions = (inputValue: string) => {
    console.log(inputValue);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2  gap-4">
        <Card>
          <CardContent>
            <Input placeholder="Search Name" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Input type="number" placeholder="Employee ID" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <AsyncReactSelect
              key="search-service"
              cacheOptions
              defaultOptions={options}
              loadOptions={loadOptions}
              placeholder="Employee Designation"
              menuPosition="absolute"
              value={selected}
              onChange={setSelected}
              isMulti={false} // single selection only
              isSearchable={false} // disables typing/filter
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1 w-1/2 p-0">
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp, idx) => (
          <Card key={idx} className="items-center text-center py-6 space-y-4 shadow-sm">
            <Image
              src={emp.image}
              alt={emp.name}
              width={100}
              height={100}
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{emp.name}</h3>
              <p className="text-sm text-gray-500">{emp.title}</p>
            </div>
            <div className="flex justify-center gap-3">
              <Button size="icon" variant="ghost">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <X className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Youtube className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Globe className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline">Call</Button>
              <Button variant="outline">View</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HrmEmployee;
