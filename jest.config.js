module.exports = {
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/__tests__/**/*.jsx',
    '**/?(*.)+(spec|test).js',
    '**/?(*.)+(spec|test).jsx'
  ],
  collectCoverageFrom: [
    '*.js',
    '*.jsx',
    '!jest.config.js',
    '!jest.setup.js'
  ],
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { 
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }]
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
