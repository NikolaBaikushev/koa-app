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

  // Optional: exclude build folders if you have any
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
};

export default config;