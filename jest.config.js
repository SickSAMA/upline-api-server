module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  // only test files with a suffix of .test or .spec in test folder
  testMatch: ['**/test/**/*.@(spec|test).[jt]s'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.[tj]s', '!**/test/**'],
  coverageDirectory: '<rootDir>/test/coverage',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  snapshotResolver: '<rootDir>/test/configs/snapshot-resolver.js',
};
