import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { login } from '@/actions/login';

import type { SignInFormType } from '@/types/signin-form-types';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        tenantCode: { label: 'Tenant Code', type: 'text' },
      },
      authorize: async credentials => {
        const { email, password, tenantCode } = credentials as SignInFormType;

        const result = await login({ email, password, tenantCode });

        if (!result.success || !result.user || !result.tokens) {
          // Returning null tells Auth.js to reject login (no session created)
          return null;
        }

        return {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
          organizationId: result.user.organizationId ?? null,
          organizationName: result.user.organizationName ?? null,
          accessToken: result.tokens.accessToken,
          refreshToken: result.tokens.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if (trigger === 'update') {
        if (session?.accessToken) {
          // eslint-disable-next-line no-param-reassign
          token.accessToken = session.accessToken;
        }

        return { ...token, ...user };
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
});
