'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { TooltipProvider } from '@/components/ui/tooltip';

import type { ComponentProps, JSX } from 'react';

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>): JSX.Element {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </NextThemesProvider>
  );
}
