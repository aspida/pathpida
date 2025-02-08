import js from '@eslint/js';
import gitignore from 'eslint-config-flat-gitignore';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { files: ['**/*.ts'] },
  gitignore({ files: ['./.gitignore', './.prettierignore'] }),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.es2020 },
    },
    rules: {
      eqeqeq: 'error',
      'no-param-reassign': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-template': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },
  prettierConfig,
);
