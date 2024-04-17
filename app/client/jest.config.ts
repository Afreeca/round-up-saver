import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testMatch: ['<rootDir>/__tests__/*.test.tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
