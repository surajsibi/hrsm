type Environment = 'development' | 'production';

const config = {
  NODE_ENV: process.env.NODE_ENV as Environment,
  ENV_TYPE: process.env.NODE_ENV as Environment,
  NEXT_PUBLIC_API_PATH: `${globalThis.origin}/api`,
} as const;

export default config;
