import constants from '@/constants';

import type { Metadata } from 'next';

export const metadata = {
  title: `404 | ${constants.APP_NAME}`,
} satisfies Metadata;

export { default } from '@/components/defaults/notFound/NotFound';
