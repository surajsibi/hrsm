import type { JSX, ReactNode } from 'react';

export default async function SetupLayout({
  children,
}: {
  children: ReactNode;
}): Promise<JSX.Element> {
  return <div className="min-h-screen w-screen bg-gradient-secondry p-4 ">{children}</div>;
}
