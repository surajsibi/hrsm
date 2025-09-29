/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        role: { type: 'string' },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
        organizationId: { type: 'string' },
        organizationName: { type: 'string' },
      },
      authorize: async credentials => {
        if (!credentials) {
          throw new Error('Please enter credentials.');
        }
        const {
          id,
          accessToken,
          refreshToken,
          email,
          name,
          role,
          organizationId,
          organizationName,
        } = credentials;

        return {
          id: (id as string) || '',
          email: (email as string) || '',
          name: (name as string) || '',
          role: (role as string) || '',
          accessToken: (accessToken as string) || '',
          refreshToken: (refreshToken as string) || '',
          organizationId: (organizationId as string) || null,
          organizationName: (organizationName as string) || null,
        };
      },
    }),
  ],
  trustHost: true,
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if (trigger === 'update') {
        if (session?.accessToken) {
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
