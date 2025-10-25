'use server';

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

    if (!data?.accessToken || !data.refreshToken || !data.user) {
      console.error('Invalid response from server', data);

      return { success: false, message: 'Invalid response from server' };
    }

    const { user, accessToken, refreshToken } = data;

    const result = await signIn('credentials', {
      redirect: false,
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      accessToken,
      refreshToken,
      organizationId: user.organizationId,
      organizationName: user.organizationName,
    });

    if (result?.error) {
      console.error('NextAuth signIn failed:', result.error);

      return { success: false, message: result.error };
    }

    return { success: true };
  } catch (error) {
    console.error('Login failed:', error);

    return { success: false, message: 'Invalid credentials or server error' };
  }
};
