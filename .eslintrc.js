// eslint-disable-next-line no-undef
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' }, // Ignore variables that start with an underscore
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: 'node_modules/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'src/**',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
};
