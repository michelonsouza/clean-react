const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!**/*.d.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy',
  },
  preset: 'ts-jest',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
};
