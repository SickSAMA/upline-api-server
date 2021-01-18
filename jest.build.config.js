// this config is for testing files in build/
module.exports = {
  testEnvironment: 'node',
  rootDir: './build',
  roots: ['<rootDir>/src/', '<rootDir>/test'],
  // only test files with a suffix of .test or .spec in test folder
  testMatch: ['**/test/**/*.@(spec|test).[jt]s'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.[tj]s', '!**/test/**'],
  coverageDirectory: '<rootDir>/test/coverage',
  snapshotResolver: '<rootDir>/test/configs/snapshot-resolver.js',
};
