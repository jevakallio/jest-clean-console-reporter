/* global require module */

import {getLogGroupHeader, getSkippedHeader} from "./getLogGroupHeader";
import {LogType} from "@jest/console";

const chalk = require("chalk");

const orderBy = ([aKey, aCount]: [string, number], [bKey, bCount]: [string, number]): number => {
  // count descending
  if (aCount > bCount) return -1;
  if (bCount > aCount) return 1;

  // key ascending
  if (aKey < bKey) return -1;
  if (bKey < aKey) return 1;

  // should never happen since keys are unique
  return 0;
};

export const getLogGroupSummary = (logs: Map<LogType, Map<string, number>>, levels: LogType[], ignored: number) => {
  if (logs.size === 0 && !ignored) {
    return null;
  }

  const lines = [`\n ${chalk.bold("\u25cf ")} Suppressed console messages:\n`];
  levels.forEach((level) => {
    const levelMap = logs.get(level);
    if (levelMap) {
      const entries = [...levelMap.entries()].sort(orderBy);
      for (let [key, count] of entries) {
        lines.push(getLogGroupHeader(level, key, count));
      }
    }
  });

  if (ignored) {
    lines.push(getSkippedHeader(ignored));
  }

  return lines;
};
