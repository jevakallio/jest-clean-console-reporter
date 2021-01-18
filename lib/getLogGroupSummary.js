/* global require module */

const chalk = require("chalk");
const { getLogGroupHeader, getSkippedHeader } = require("./getLogGroupHeader");

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

const getLogGroupSummary = (logs, levels, ignored) => {
  if (logs.size === 0 && !ignored) {
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

  if (ignored) {
    lines.push(getSkippedHeader(ignored));
  }

  return lines;
};

module.exports = getLogGroupSummary;
