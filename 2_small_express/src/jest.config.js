module.exports = {
  preset: "ts-jest",
  testEnvironment: 'node',
  globals: {
    "ts-jest": {
      tsonfig: "tsconfig.test.json",
    },
  },
  "testRegex": ".*.(test|spec).(js|ts)"
};