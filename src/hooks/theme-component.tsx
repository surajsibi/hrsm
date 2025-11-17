'use client';

import { type JSX, useEffect } from 'react';

import { useAuthStore } from '@/store/auth.store';

export function ThemeApply(): JSX.Element | null {
  const theme = useAuthStore(state => state.theme);
  const hydrated = useAuthStore(state => state.hydrate);

  useEffect(() => {
    if (!hydrated) return;

    if (theme) {
      document.documentElement.style.setProperty('--gradient-primary', theme);
    }
  }, [theme, hydrated]);

  return null;
}
