import type { JSX, ReactNode } from 'react';

export default async function TenantOnBoardingLayout({
  children,
}: {
  children: ReactNode;
}): Promise<JSX.Element> {
  return <div className="min-h-screen w-full bg-gradient-secondry  ">{children}</div>;
}
