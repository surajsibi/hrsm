import { isLive } from '@/utils';

const constants = {
  APP_NAME: 'HRMS Solutions.',
  COOKIES: {
    TOKEN_NAME: 'token',
    THEME_NAME: 'theme',
    SYSTEM_THEME: 'system_theme',
  },
  THEME: {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
  },
  PROGRESS_BAR_DELAY: isLive ? 200 : 500,
  STARTUP_PROGRESS_BAR_TIMEOUT: 200,
} as const;

export default constants;
