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

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!src/test/**',
    '!src/mocks/**',
    '!src/App.tsx',
    '!src/**/index.ts',
    '!src/**/index.tsx',
    // Infrastructure files - no business logic to test
    '!src/App.tsx', // Entry point - only renders providers
    '!src/**/index.ts', // Re-export barrel files
    '!src/**/index.tsx',

    // API layer - thin wrappers around fetch, tested via component integration
    // These hooks have no business logic, only network calls handled by MSW in dev
    '!src/api/hooks/**',

    // Providers - configuration and setup files
    '!src/providers/**',
  ],
  coverageReporters: ['text', 'lcov', 'html'],

  coverageThreshold: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
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
