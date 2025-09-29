// eslint-disable-next-line max-len
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports
import NextAuth from 'next-auth';

interface ISetting {
  companyName?: string;
  companyLogo?: string;
}
declare module 'next-auth' {
  interface User {
    id: string;
    role: string | null;
    accessToken: string;
    refreshToken: string;
    organizationId: string | null;
    organizationName: string | null;
    exp?: number;
  }
  interface Session {
    user: User & {
      id: string;
      role: string | null;
      accessToken: string;
      refreshToken: string;
      organizationId: string;
      organizationName: string;
    };
    token: {
      id: string;
      role: string | null;
    };
  }
}
