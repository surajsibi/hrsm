import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface IUser {
  id: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  organizationId: string | null;
  organizationName: string | null;
}
interface IAuthStore {
  session: string | null;
  jwtToken: string | null;
  user: IUser | null;
  hydrate: boolean;
  setHydrate: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer(set => ({
      session: null,
      jwtToken: null,
      user: null,
      hydrate: false,
      setHydrate: () => set({ hydrate: true }),
    })),
    {
      name: 'auth',
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrate();
        };
      },
    }
  )
);
