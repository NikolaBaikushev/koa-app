import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // JS rules
  js.configs.recommended,

  // TS rules
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,ts,cjs,mjs}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'semi': ['error', 'always'],
      'indent': ['error', 4, { SwitchCase: 1 }],
      'quotes': ['error', 'single'],

      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  {
    ignores: ['dist/', 'node_modules/'],
  },
]);
