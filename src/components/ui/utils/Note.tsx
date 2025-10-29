import { HTMLAttributes, memo, ReactNode } from 'react';
interface NoteProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}
function NoteMemo({ className, children, ...props }: NoteProps) {
  return (
    <div
      className={`p-4 bg-[#bedbfe80] rounded-lg text-sm text-[#3c83f6] flex gap-1 items-start ${className}`}
      {...props}
    >
      <p className="flex">
        <strong className="">Note:</strong>
        {children}
      </p>
    </div>
  );
}

export const Note = memo(NoteMemo);
