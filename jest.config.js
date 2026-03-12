module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!**/node_modules/**',
  ],
  testMatch: ['**/tests/**/*.test.js'],
  moduleFileExtensions: ['js', 'json'],
  verbose: true,
};
