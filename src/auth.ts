/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
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
      authorize: async (credentials: any): Promise<any> => {
        if (!credentials) {
          throw new Error('Invalid credentials');
        }

        const { accessToken, refreshToken } = credentials;

        return {
          accessToken: accessToken ?? '',
          refreshToken: refreshToken ?? '',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;

      return session;
    },
  },
});
