import nextJest from 'next/jest.js';

import type { Config } from 'jest';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 👈 add this line
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/(?!(@tanstack|@next|next-auth|axios)/)'],
};

export default createJestConfig(config);
