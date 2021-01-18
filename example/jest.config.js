const rules = [
  {
    match: /^Received invalid input:/,
    group: "Received invalid input",
    keep: true,
  },
  {
    match: /^Received a non-integer number:/,
    group: "Received a non-integer number",
  },
  {
    match: /^Received value:/,
    group: null,
  },
];

module.exports = {
  reporters: [
    ["jest-clean-console-reporter", { rules }],
    "@jest/reporters/build/SummaryReporter",
  ],
  testMatch: ["<rootDir>/src/**/*.test.js"],
};
