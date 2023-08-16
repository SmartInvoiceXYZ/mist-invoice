import type { Config } from "@jest/types";
import { defaults } from "jest-config";

const config: Config.InitialOptions = {
  coveragePathIgnorePatterns: [
    ...defaults.coveragePathIgnorePatterns,
    "src/utils/constants.ts",
    "src/index.tsx",
    "src/reportWebVitals.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;
