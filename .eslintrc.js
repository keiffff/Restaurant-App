module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/standard',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'import', 'jest', 'jsx-a11y', 'prefer-arrow', 'prettier', 'react', 'react-hooks'],
  rules: {
    // eslint
    'newline-before-return': 'error',
    'no-console': 'off',
    'import/prefer-default-export': ['off'],
    'no-fallthrough': 'off',
    'no-restricted-syntax': 'off',
    // @typescript-eslint
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '[Rr]eact' }],
    '@typescript-eslint/prefer-interface': 'off',
    // prettier
    'prettier/prettier': [
      'warn',
      {},
      {
        usePrettierrc: true,
      },
    ],
    // import
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // jsx-a11y
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    // react
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/jsx-one-expression-per-line': ['off'],
    'react/jsx-wrap-multilines': ['off'],
    // react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', 'jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
    },
  },
};
