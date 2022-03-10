// set this environment variable to run integration tests

let testRegex = ["(/__tests__/.*|\\.test)\\.[jt]sx?$"];
let testPathIgnorePatterns = [".*\\.intgr\\.test.*"];
let modulePathIgnorePatterns = [];

module.exports = {
  preset: "ts-jest",
  automock: false,
  testRegex,
  testPathIgnorePatterns,
  modulePathIgnorePatterns,
  moduleFileExtensions: ["ts", "js"],
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: false,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  roots: ["<rootDir>/src", "<rootDir>/test"],
};
