// eslint-disable-next-line max-len
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports
import NextAuth from 'next-auth';

interface ISetting {
  companyName?: string;
  companyLogo?: string;
}
declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
  }
  interface Session {
    accessToken: string;
    refreshToken: string;
  }
}
