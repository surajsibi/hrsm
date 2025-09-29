'use client';

import { type JSX, type ReactNode, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { isServer } from '@/utils';

const QueryProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: isServer ? 0 : 1,
            staleTime: 10_000,
            gcTime: isServer ? Infinity : 1000 * 60 * 5,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
