import ESLintPluginNext from '@next/eslint-plugin-next';
import ESLintPluginQuery from '@tanstack/eslint-plugin-query';
import ESLintPluginReactRefresh from 'eslint-plugin-react-refresh';

const customReactESLintConfig = [
  {
    name: 'react-refresh/rules',
    plugins: {
      'react-refresh': ESLintPluginReactRefresh,
    },
    ignores: ['src/context/**'],
    rules: {
      ...ESLintPluginReactRefresh.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'error',
        {
          allowExportNames: ['metadata'],
        },
      ],
    },
  },
  // TAN STACK QUERY CONFIG
  ...ESLintPluginQuery.configs['flat/recommended'],
  // NEXT.JS CONFIG
  {
    name: 'next/rules',
    plugins: {
      '@next/next': ESLintPluginNext,
    },
    rules: {
      ...ESLintPluginNext.configs.recommended.rules,
      ...ESLintPluginNext.configs['core-web-vitals'].rules,
    },
  },
];

export default customReactESLintConfig;
