// set this environment variable to run integration tests
const isIntegration = !!process.env.JEST_INTEGRATION;

let testRegex = ["(/__tests__/.*|\\.test)\\.[jt]sx?$"];
let testPathIgnorePatterns = [".*\\.intgr\\.test.*"];
let modulePathIgnorePatterns = [];
if (isIntegration) {
  testRegex = ["(\\.|/)intgr\\.test\\.[jt]sx?$"];
  testPathIgnorePatterns = ["^((?!([.]intgr[.])).)*$"];
  // disable auto-mocking of node modules
  modulePathIgnorePatterns = ["<rootDir>/src/__mocks__"];
}

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
  roots: ["<rootDir>/src"],
};
