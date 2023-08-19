import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  coveragePathIgnorePatterns: [
    "node_modules",
    "src/utils/constants.ts",
    "src/index.tsx",
    "src/reportWebVitals.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },   
  "setupFilesAfterEnv": ["./src/setupTests.ts"],
  "transformIgnorePatterns": [
    "node_modules/(?!preact)",
  ],
};

export default jestConfig;
