module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './__tests__/tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    // 'import',
  ],
  settings: {},
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'max-len': [1, 140],
    'no-plusplus': [0],
  },
  globals: {
    NodeJS: 'readonly',
  },
  overrides: [
    {
      files: ['./test/**', './__tests__/**'],
      env: {
        jest: true,
      },
    },
  ],
};
