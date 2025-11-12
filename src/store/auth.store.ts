import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
  organizationId?: string | null;
  organizationName?: string | null;
}
export interface IAuthStore {
  user: IUser | null;
  hydrate: boolean;
  setHydrate: () => void;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer(set => ({
      user: null,
      hydrate: false,
      setHydrate: () => set({ hydrate: true }),
      setUser: (user: IUser) => set({ user }),
      clearUser: () => set({ user: null }),
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
