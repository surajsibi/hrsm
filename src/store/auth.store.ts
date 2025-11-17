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
  theme: string | null;
  hydrate: boolean;
  setHydrate: () => void;
  setUser: (_user: IUser) => void;
  clearUser: () => void;
  setTheme: (_theme: string) => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer(set => ({
      user: null,
      hydrate: false,
      // theme: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(217 84% 54%))',
      theme: '#367df6',
      setHydrate: () => set({ hydrate: true }),
      setUser: (user: IUser) => set({ user }),
      setTheme: (theme: string) => set({ theme }),
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
