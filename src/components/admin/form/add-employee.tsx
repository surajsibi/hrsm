'use client';

import { type JSX, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type SingleValue } from 'react-select';
import AsyncReactSelect from 'react-select/async';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { EmployeeDetail } from '@/types/form-types';
import { cn } from '@/utils';

import type { z } from 'zod';

interface OptionType {
  value: string;
  label: string;
}

const data = [
  'Information Technology Department',
  'Technology Depertment',
  'Security Department',
  'Network Operation Department',
  'Systems Adminitration Department',
  'Database Management Department',
  'Software Devlopment Department',
  'Web Devlopment Department',
  'Project Management Department',
  'IT Support Department',
  'Consulting Department',
];

const AddEmpolyee = (): JSX.Element => {
  const [designation, setdesignation] = useState<SingleValue<OptionType>>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const options = data.map(item => ({ value: item, label: item }));
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const loadOptions = (inputValue: string) => {
    console.log(inputValue);
  };
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(EmployeeDetail),
    defaultValues: {
      firstName: '',
      lastName: '',
      contactnumber: '',
      email: '',
      username: '',
      employeeid: '',
      designation: [],
      joiningdate: new Date(),
      accountholdername: '',
      accountnumber: '',
      bankname: '',
      address: '',
      branchname: '',
      employeephoto: [],
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof EmployeeDetail>> = async formData => {
    console.warn('inputValue:', formData);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    multiple: false,
    onDrop: async acceptedFiles => {
      setUploadedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
      form.setValue('employeephoto', uploadedFiles);
    },
  });

  return (
    <div className="flex items-center w-full  h-screen justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2">
          <Card className="w-full max-w-screen-md mx-auto">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="min-w-[200px]">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel className="text-lg font-bold">First Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel className="text-lg font-bold">Last Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="contactnumber"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel className="text-lg font-bold">Contact Number</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel className="text-lg font-bold">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel className="text-lg font-bold">User Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="employeeid"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel className="text-lg font-bold">Employee ID</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel className="text-lg font-bold">Address</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="designation"
                  render={() => (
                    <FormItem className="grow">
                      <FormLabel className="text-lg font-bold">Designation</FormLabel>
                      <FormControl>
                        <AsyncReactSelect
                          key="search-service"
                          cacheOptions
                          defaultOptions={options}
                          loadOptions={loadOptions}
                          placeholder="Employee Designation"
                          menuPosition="absolute"
                          value={designation}
                          onChange={setdesignation}
                          isMulti={false} // single selection only
                          isSearchable={false}
                          // disables typing/filter
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="joiningdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">Joining Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !date && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, 'PPP') : 'Pick a date'}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={selected => {
                              setDate(selected); // update state
                              field.onChange(selected); // sync with react-hook-form
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="accountholdername"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel className="text-lg font-bold">Account Holder Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="accountnumber"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel className="text-lg font-bold">Account Number</FormLabel>
                      <FormControl>
                        <Input type="numbar" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="bankname"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel className="text-lg font-bold">Bank Namer</FormLabel>
                      <FormControl>
                        <Input type="numbar" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="bankname"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel className="text-lg font-bold">Branch Name</FormLabel>
                      <FormControl>
                        <Input type="numbar" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="employeephoto"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">Upload Your Images</FormLabel>
                      <div
                        {...getRootProps({
                          className:
                            'border border-dashed border-gray-300 p-8 rounded cursor-pointer text-center ',
                        })}
                      >
                        <input {...getInputProps()} />
                        <p className="text-gray-500 ">Selecte your Image</p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <CardFooter>
                <Button type="submit">Add Empolyee</Button>
              </CardFooter>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default AddEmpolyee;
