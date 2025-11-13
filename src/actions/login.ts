'use server';

import { axiosPublic } from '@/lib/axios';

interface LoginSuccess {
  success: true;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    organizationId?: string | null;
    organizationName?: string | null;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

interface LoginFailure {
  success: false;
  message: string;
}

export type LoginResult = LoginSuccess | LoginFailure;

export const login = async (formData: {
  email: string;
  password: string;
  tenantCode?: string;
}): Promise<LoginResult> => {
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
        id: userResponse.authId,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      error?.data?.detail ?? error?.data ?? error?.message ?? 'Unexpected server error';

    return { success: false, message };
  }
};
