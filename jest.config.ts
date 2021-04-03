import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['pages'],
  coveragePathIgnorePatterns: ['pages', 'dist']
}

export default config
