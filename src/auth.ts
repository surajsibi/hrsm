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
      authorize: async (credentials: any) => {
        if (!credentials) {
          throw new Error('Invalid credentials');
        }

        const {
          id,
          email,
          name,
          role,
          accessToken,
          refreshToken,
          organizationId,
          organizationName,
        } = credentials;

        return {
          id: id || '',
          email: email || '',
          name: name || '',
          role: role || null,
          accessToken: accessToken || '',
          refreshToken: refreshToken || '',
          organizationId: organizationId || null,
          organizationName: organizationName || null,
        };
      },
    }),
  ],
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
