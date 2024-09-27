const baseRules = require('./rules/base.cjs');
const reactRules = require('./rules/react.cjs');
const importRules = require('./rules/import.cjs');
const typescriptRule = require('./rules/typescriptEslint.cjs');

module.exports = {
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  rules: {
    ...baseRules,
    ...reactRules,
    ...importRules,
    ...typescriptRule,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
};
