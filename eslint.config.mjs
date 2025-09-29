// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import customGeneralESLintConfig from './lint/general.eslint.mjs';
import customImportESLintConfig from './lint/import.eslint.mjs';
import customJSESLintConfig from './lint/javascript.eslint.mjs';
import customPrettierESLintConfig from './lint/prettier.eslint.mjs';
import customReactESLintConfig from './lint/react.eslint.mjs';
import customTSESLintConfig from './lint/typescript.eslint.mjs';
import customUIESLintConfig from './lint/ui.eslint.mjs';
import { gitIgnoreFile } from './lint/utils.mjs';

export default [
  {
    ...gitIgnoreFile,
    ignores: [
      ...gitIgnoreFile.ignores,
      // Build directories
      '.next/**',
      'dist/**',
      'build/**',
      // Dependencies
      'node_modules/**',
      // Cache and temp files
      '.cache/**',
      '*.log',
      // Coverage and test reports
      'coverage/**',
      // Environment and local files
      '.env*',
      '.env.local',
      '.env.*.local',
    ],
  },
  ...customUIESLintConfig,
  ...customJSESLintConfig,
  ...customReactESLintConfig,
  ...customTSESLintConfig,
  ...customImportESLintConfig,
  ...customPrettierESLintConfig,
  ...customGeneralESLintConfig,
  ...storybook.configs['flat/recommended'],
];
