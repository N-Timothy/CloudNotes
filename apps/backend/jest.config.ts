import fs from 'fs'

import {} from 'jest'

const config = JSON.parse(
  fs.readFileSync(`${__dirname}/.swcrc`, 'utf-8'),
)

/**
 * @type {import('jest').Config}
 */
export default {
  clearMocks: true,

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/types/**.d.ts'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },

  setupFiles: ['<rootDir>/other/setup-tests/env-setup.ts'],

  testTimeout: 2000,

  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {...config /* custom configuration in Jest */},
    ],
  },
}
