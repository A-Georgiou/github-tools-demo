module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '**/test_*.js',
    '**/test_*.jsx'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    '*.js',
    '*.jsx',
    '!test_*.js',
    '!test_*.jsx',
    '!jest.config.js',
    '!jest.setup.js',
  ],
};
