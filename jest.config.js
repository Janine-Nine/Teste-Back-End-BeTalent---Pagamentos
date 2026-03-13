/** @type {import('jest').Config} */

module.exports = {

  preset: "ts-jest",

  testEnvironment: "node",

  roots: [
    "<rootDir>/src"
  ],

  testMatch: [
    "**/__tests__/**/*.test.ts",
    "**/?(*.)+(spec|test).ts"
  ],

  moduleFileExtensions: [
    "ts",
    "js",
    "json"
  ],

  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json"
      }
    ]
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },

  collectCoverage: true,

  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/server.ts",
    "!src/**/*.d.ts"
  ],

  coverageDirectory: "coverage",

  coverageReporters: [
    "text",
    "lcov",
    "html"
  ],

  testTimeout: 10000,

  verbose: true,

  clearMocks: true,

  resetMocks: true,

  restoreMocks: true,

  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],

  cacheDirectory: ".jest-cache"

}