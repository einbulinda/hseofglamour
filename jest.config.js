const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customConfigJest = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customConfigJest);
