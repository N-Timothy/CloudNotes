const OFF = 0
const WARN = 1
const ERROR = 2

/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['import', 'prefer-let'],
  rules: {
    'no-var': ERROR,
    semi: OFF,
    indent: [ERROR, 2, {SwitchCase: 1}],
    'no-multi-spaces': ERROR,
    'space-in-parens': ERROR,
    'no-multiple-empty-lines': ERROR,
    'prefer-let/prefer-let': ERROR,
    '@typescript-eslint/consistent-type-imports': ERROR,
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
  },
}
