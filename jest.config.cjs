// eslint-disable-next-line no-undef
module.exports = {
  verbose: true,
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
};
