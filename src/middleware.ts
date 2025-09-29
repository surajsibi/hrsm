import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';
import { auth as middleware } from '@/lib/auth';

const intlMiddleware = createMiddleware(routing);

export default middleware(async request => {
  const intlResponse = intlMiddleware(request);
  const response: NextResponse = intlResponse || NextResponse.next();

  const auth = request.auth;
  // const role = request?.auth?.user?.role;
  const isAuthenticated = !!auth;

  console.log({ isAuthenticated });
  // const locale = request.headers.get("x-locale") || routing.defaultLocale;
  // const pathname = request.nextUrl.pathname;

  return response;
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // eslint-disable-next-line unicorn/prefer-string-raw
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
