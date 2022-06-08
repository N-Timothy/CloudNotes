const ERROR = 2

/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  extends: ['custom'],
  env: {
    es6: true,
    node: true,
  },
  overrides: [
    {
      // for files matching this pattern
      files: ['*.ts', '*.tsx'],
      // following config will override "normal" config
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
      },
      plugins: [],
      rules: {
        '@typescript-eslint/consistent-type-imports': [
          ERROR,
          {
            prefer: 'type-imports',
            disallowTypeAnnotations: false,
          },
        ],
        '@typescript-eslint/consistent-type-exports': [
          ERROR,
          {
            fixMixedExportsWithInlineTypeSpecifier: false,
          },
        ],
      },
    },
  ],
  rules: {
    'import/order': [
      ERROR,
      {
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '~/constants/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~/core/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~/models/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~/utils/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [],
        groups: [
          ['builtin'],
          ['external'],
          'internal',
          'type',
          ['parent', 'sibling', 'index'],
        ],
      },
    ],
    'import/group-exports': ERROR,
  },
}
