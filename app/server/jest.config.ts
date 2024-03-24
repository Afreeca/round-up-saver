import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@account/(.*)$': '<rootDir>/src/account/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@roundup/(.*)$': '<rootDir>/src/roundup/$1',
    '^@security/(.*)$': '<rootDir>/src/security/$1'
  }
};

export default config;
