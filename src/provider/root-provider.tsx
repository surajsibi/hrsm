import { NextIntlClientProvider } from 'next-intl';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import QueryClientProvider from '@/provider/query-provider';
import { ThemeProvider } from '@/provider/theme-provider';

import type { JSX, ReactNode } from 'react';

const RootProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <ThemeProvider>
      <NextIntlClientProvider>
        <QueryClientProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </QueryClientProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
