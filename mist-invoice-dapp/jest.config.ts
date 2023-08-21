import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  coveragePathIgnorePatterns: [
    "node_modules",
    "src/utils/constants.ts",
    "src/index.tsx",
    "src/reportWebVitals.ts"
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react"
        } //"tsconfig.test.json"
      }
    ],
    "node_modules/preact/.+\\.(j|t)sx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react"
        }
      }
    ]
  },
  transformIgnorePatterns: ["node_modules/(?!preact)"]
};

export default jestConfig;
