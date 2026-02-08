import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  testMatch: ['**/?(*.)+(test|spec).[tj]s?(x)'],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          baseUrl: '.',
          paths: {
            '@/*': ['src/*'],
            '@test/*': ['src/test/*'],
            '@components/*': ['src/components/*'],
            '@api/*': ['src/api/*'],
            '@features/*': ['src/features/*'],
            '@theme/*': ['src/theme/*'],
            '@providers/*': ['src/providers/*'],
            '@mocks/*': ['src/mocks/*'],
            '@types/*': ['src/types/*'],
          },
        },
      },
    ],
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/src/test/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@providers/(.*)$': '<rootDir>/src/providers/$1',
    '^@mocks/(.*)$': '<rootDir>/src/mocks/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  collectCoverage: false,
  coverageDirectory: 'coverage',

  clearMocks: true,
  resetMocks: true,
}

export default config
