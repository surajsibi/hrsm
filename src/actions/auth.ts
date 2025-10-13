'use server';

import { cookies } from 'next/headers';

import { signIn } from '@/lib/auth';
import { axiosPublic } from '@/lib/axios';

export const login = async (formData: {
  email: string;
  password: string;
  tenantCode?: string;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const { data } = await axiosPublic.post('/login', {
      credential: formData.email,
      password: formData.password,
      tenantCode: formData?.tenantCode,
    });

    const { user, accessToken, refreshToken } = data;

    console.log(data, 'this is data');

    const cookieStore = await cookies();

    cookieStore.set('accessToken', accessToken, {
      path: '/',
      maxAge: 60 * 15,
      httpOnly: false, // accessible from client (for axios)
    });
    cookieStore.set('refreshToken', refreshToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
    });

    // 🔐 Tell NextAuth to create a session
    await signIn('credentials', {
      redirect: false,
      ...user,
      accessToken,
      refreshToken,
    });

    return { success: true };
  } catch (error: unknown) {
    console.log('Login failed:', error);
  }

  return { success: false, message: 'Invalid credentials or server error' };
};
