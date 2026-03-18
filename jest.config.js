module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/js/**/*.js',
    '!src/index.js',
  ],
};
