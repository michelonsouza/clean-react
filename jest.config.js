module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/router/**/*',
    '!<rootDir>/src/presentation/protocols/index.ts',
    '!<rootDir>/src/domain/**/index.ts',
    '!<rootDir>/src/validation/protocols/index.ts',
    '!**/*.d.ts',
  ],
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
