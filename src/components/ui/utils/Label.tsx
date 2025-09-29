import {  LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";

interface LabelProps  extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  className?: string;
  
}

export function Label({ children, className,...props}: LabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none text-[#344256] ",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
