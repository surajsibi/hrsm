import { cn } from '@/utils';
import React, { forwardRef, InputHTMLAttributes } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  id?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, id, ...props }, ref) => {
    return (
      <input
      ref={ref}
        className={cn('rounded-lg w-full bg-[#fcfcfc] h-11 border-none outline-none focus:none  text-heading text-sm border-0  file:font-medium  py-2 pl-10 transition-all duration-300 placeholder:text-paragraph appearance-none  ', className)}
        placeholder={placeholder}
        id={id}
        {...props}
      />
    );
  }
);
