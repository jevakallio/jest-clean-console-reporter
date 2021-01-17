/* global require module */

const chalk = require("chalk");
const getLogGroupHeader = require("./getLogGroupHeader");

const orderBy = ([aKey, aCount], [bKey, bCount]) => {
  // count descending
  if (aCount > bCount) return -1;
  if (bCount > aCount) return 1;

  // key ascending
  if (aKey < bKey) return -1;
  if (bKey < aKey) return 1;

  // should never happen since keys are unique
  return 0;
};

const getLogGroupSummary = (logs, levels) => {
  if (logs.size === 0) {
    return null;
  }

  const lines = [`\n ${chalk.bold("\u25cf ")} Suppressed console messages:\n`];
  levels.forEach((type) => {
    const level = logs.get(type);
    if (level) {
      const entries = [...level.entries()].sort(orderBy);
      for (let [key, count] of entries) {
        lines.push(getLogGroupHeader(type, key, count));
      }
    }
  });

  return lines;
};

module.exports = getLogGroupSummary;
