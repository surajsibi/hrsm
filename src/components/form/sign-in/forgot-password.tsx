'use client';

import { type JSX, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ForgotPasswordSchema } from '@/types/signin-form-types';

import type { z } from 'zod';

const ForgotPassword = (): JSX.Element => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const toggleNewPassword = () => setShowNewPassword(prev => !prev);

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
      newpassword: '',
      confirmpassword: '',
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof ForgotPasswordSchema>> = async formData => {
    console.log(formData);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex-col justify-center ">
        <Image src="/Arvasit-Logo.webp" alt="HRM" width={150} height={200} />
        <CardTitle className="text-center text-2xl ">HRMS</CardTitle>

        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pl-10 w-full">
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grow w-80">
                    <FormLabel className="text-xl text-[#49506d]">Email</FormLabel>
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
                name="newpassword"
                render={({ field }) => (
                  <FormItem className="grow w-80">
                    <FormLabel className=" text-xl text-[#49506d]">New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? 'text' : 'password'}
                          placeholder="new password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={toggleNewPassword}
                          className="absolute right-3 top-2.5 text-gray-400"
                          tabIndex={-1}
                        >
                          {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem className="grow w-80">
                    <FormLabel className="text-xl text-[#49506d]">Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="confirm password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button type="submit" className="w-80">
                Change Password
              </Button>
            </div>
          </form>
        </Form>

        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="flex items-center w-full gap-4">
            <hr className="flex-grow border-t border-gray-400" />
            <span className="text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>
          <div>
            <Button variant="link" className="text-muted-foreground text-md">
              Back to login
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;
