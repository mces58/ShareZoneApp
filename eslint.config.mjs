import eslint from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

import importRule from './plugins/import/index.mjs';
import reactNativeRule from './plugins/react-native/index.mjs';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  pluginReact.configs.flat.recommended,
  {
    ignores: [
      'node_modules',
      'plugins',
      '.storybook',
      '.storybook-web',
      'docs',
      'babel.config.js',
    ],
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    languageOptions: {
      globals: {
        __DEV__: true,
        global: true,
        process: true,
      },
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      'always-import': importRule,
      'react-native': reactNativeRule,
    },
  },

  {
    rules: {
      // custom rules
      'always-import/module-require': [
        'error',
        { moduleName: 'styled-components/native' },
      ],
      'react-native/use-touchable-opacity': 'error',
      'react-native/not-inline-css': 'error',

      // eslint rules
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/no-array-delete': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-redundant-type-constituents': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',
      '@typescript-eslint/no-unnecessary-type-arguments': 'error',
      '@typescript-eslint/no-unsafe-enum-comparison': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-throw-literal': 'off',
      '@typescript-eslint/only-throw-error': 'error',
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          allow: ['private-constructors'],
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          typeLiterals: {
            order: 'alphabetically-case-insensitive',
            optionalityOrder: 'required-first',
            memberTypes: ['field', 'signature', 'constructor', 'method'],
          },
          interfaces: {
            order: 'alphabetically-case-insensitive',
            optionalityOrder: 'required-first',
            memberTypes: ['field', 'signature', 'constructor', 'method'],
          },
          classes: [
            'private-instance-field',
            'private-static-field',
            'protected-instance-field',
            'protected-static-field',
            'public-instance-field',
            'public-static-field',
            'private-constructor',
            'protected-constructor',
            'public-constructor',
            'private-instance-method',
            'private-static-method',
            'protected-instance-method',
            'protected-static-method',
            'public-instance-method',
            'public-static-method',
          ],
          classExpressions: ['field', 'constructor', 'method'],
        },
      ],
    },
  }
);
