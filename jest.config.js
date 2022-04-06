module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  transform: {
    "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};
