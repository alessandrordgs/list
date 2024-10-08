export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
    // process `*.tsx` files with `ts-jest`
  },
  rootDir: 'src',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.app.json'
    }
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/__ mocks __/fileMock.js',
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  },
}