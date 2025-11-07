'use server';

import { axiosPublic } from '@/lib/axios';

interface ILoginResult {
  success: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    organizationId?: string | null;
    organizationName?: string | null;
  };
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

export const login = async (formData: {
  email: string;
  password: string;
  tenantCode?: string;
}): Promise<ILoginResult | { success: false; message: string }> => {
  try {
    const { data } = await axiosPublic.post('/login', {
      credential: formData.email,
      password: formData.password,
      tenantCode: formData?.tenantCode,
    });

    if (!data?.accessToken || !data.refreshToken || !data.userResponse) {
      console.error('Invalid response from servers', data);

      return { success: false, message: 'Invalid response from server' };
    }

    const userResponse = data.userResponse;
    const firstAccessLevel = data.accessLevels?.[0];

    return {
      success: true,
      user: {
        id: userResponse.authId ?? userResponse.email,
        email: userResponse.email,
        name: `${userResponse.firstName} ${userResponse.lastName}`.trim(),
        role: userResponse.role,
        organizationId: firstAccessLevel?.orgId ?? null,
        organizationName: firstAccessLevel?.orgName ?? null,
      },
      tokens: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      },
    };
  } catch (error) {
    console.error('Login failed:', error);

    return { success: false, message: 'Invalid credentials or server error' };
  }
};
