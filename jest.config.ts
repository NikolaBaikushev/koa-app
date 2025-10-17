import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  // setupFiles: ["<rootDir>/tests/env.ts"],
  // setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  // globalSetup: "<rootDir>/tests/globalSetup.ts",

  // Look for .spec or .test files in src/ and tests/
  testMatch: [
    "<rootDir>/src/**/*.spec.ts",
    "<rootDir>/src/**/*.test.ts",
    "<rootDir>/tests/**/*.(spec|test).ts"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.spec.ts", 
    "!src/**/*.test.ts",
    "!src/types/**",     
    "!src/config/**",  
    "!src/app.ts",      
  ],
  coverageDirectory: "coverage", 
  coverageReporters: ["text", "lcov", "html"], 
  coverageThreshold: {
    "global": {
      "statements": 90,
      "branches": 80,
      "functions": 90,
      "lines": 90
    }
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
};

export default config;