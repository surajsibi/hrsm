import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import config from '@/config';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line unicorn/prefer-global-this
export const isServer = typeof window === 'undefined';
export const isProduction = config.NODE_ENV === 'production';

export const isLive = config.ENV_TYPE === 'production';

export const sleep = async (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
