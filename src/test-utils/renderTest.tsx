import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type RenderResult, render } from '@testing-library/react';

import type { ReactElement } from 'react';

/**
 * Creates a custom render context for a React element, exposing helper methods
 * such as `.withQueryClient()` to wrap the component with required providers.
 *
 * @param component - The React element to render.
 * @returns An object exposing helper methods to render the component with context.
 *
 * @example
 * ```tsx
 * import { renderTest } from "@/test-utils/renderTest";
 * renderTest(<MyComponent />).withQueryClient();
 * ```
 */
export function renderTest(component: ReactElement): { withQueryClient: () => RenderResult } {
  return {
    /**
     * Renders the component inside a QueryClientProvider using default test config.
     *
     * @returns The result of React Testing Library's render function.
     */
    withQueryClient(): RenderResult {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      return render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
    },
  };
}
