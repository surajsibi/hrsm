const customGeneralESLintConfig = [
  {
    name: 'general/rules',
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-void': 'off',
      'consistent-return': 'error',
      'no-array-constructor': 'error',
      'no-underscore-dangle': [
        'error',
        {
          allow: ['_id'],
        },
      ],
      'no-restricted-syntax': [
        'error',
        'ForStatement',
        'ContinueStatement',
        'DoWhileStatement',
        'WhileStatement',
        'WithStatement',
        // REACT
        {
          selector: 'MemberExpression[object.name="React"]',
          message: 'Use of React.method is not allowed.',
        },
        // REACT - TYPESCRIPT
        {
          selector: 'TSTypeReference[typeName.left.name="React"]',
          message: 'Use of React.type is not allowed.',
        },
      ],
      // New rules
      'max-len': [
        'error',
        {
          code: 100,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'no-duplicate-imports': 'error',
      'no-param-reassign': ['error', { props: true }],
    },
  },
];

export default customGeneralESLintConfig;
