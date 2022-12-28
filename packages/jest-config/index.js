module.exports = {
  roots: [
    './__tests__',
  ],

  testMatch: [
    '**/__tests__/**/*.+(ts)',
    '**/?(*.)+(spec|test).+(ts)',
  ],
  extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      }
    ],
  },
  setupFilesAfterEnv: [
    './test/setup.js',
  ],
  testPathIgnorePatterns: [
    '__tests__/__mocks__',
    'dist',
  ],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
