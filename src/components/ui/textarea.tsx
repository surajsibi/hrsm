'use client';
import { JSX } from 'react/jsx-runtime';
import { cn } from '@/utils';
import { Label } from './utils/Label';
import { Description } from '@/components/ui/utils/Descriptions';

import type { FieldError } from 'react-hook-form';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: string;
  error?: FieldError;
  icon?: React.ReactNode;
  id?: string;
}

function Textarea({ className, label, error, icon, id, ...props }: TextareaProps): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-start gap-2 w-full relative">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div
        className={cn(
          'flex justify-center items-center border border-[#dfe2e799]  relative rounded-md w-full transition-all duration-300 z-20 mt-1',
          error
            ? 'border-destructive  ring-1 ring-offset-4 ring-destructive'
            : 'focus-within:border-primary ring-0 focus-within:ring-1 focus-within:ring-offset-4 focus-within:ring-primary'
        )}
      >
        {icon && <span>{icon}</span>}
        <textarea
          data-slot="textarea"
          id={id}
          rows={3}
          className={cn(
            'rounded-lg w-full bg-[#fcfcfc]  border-none outline-none focus:none  text-heading text-sm border-0  file:font-medium  py-2  pl-4 transition-all duration-300 placeholder:text-paragraph resize-none',
            { 'pl-10': icon },
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <Description className="text-destructive text-xs mt-1 absolute top-[100%]">
          *{error.message}*
        </Description>
      )}
    </div>
  );
}

export { Textarea };
