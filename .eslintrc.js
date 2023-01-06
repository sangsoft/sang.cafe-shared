module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {},
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:cypress/recommended',
  ],
  rules: {
    // we only want single quotes
    quotes: ['error', 'single', { avoidEscape: true }],
    // we want to force semicolons
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/no-use-before-define': 1,
    'quote-props': ['error', 'as-needed'],
    'import/no-unresolved': 0,
    'max-len': ['error', 120],
    'object-curly-spacing': ['error', 'always'],
    indent: ['off'],
    'require-jsdoc': ['off'],
    'react/prop-types': ['off'],
  },
};
