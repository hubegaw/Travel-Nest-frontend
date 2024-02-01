module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['./src/setup-jest.ts'],
  testPathIgnorePatterns: ['./node_modules/', './gen/'],
};
