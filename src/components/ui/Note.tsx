import { HTMLAttributes, memo, ReactNode } from 'react';
interface NoteProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}
export function Note({ className, children, ...props }: NoteProps) {
  return (
    <div
      className={`p-4 bg-(--gradient-primary) rounded-lg text-sm text-white flex gap-1 items-start ${className}`}
      {...props}
    >
      <p className="flex">
        <strong className="">Note:</strong>
        {children}
      </p>
    </div>
  );
}
