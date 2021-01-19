"use strict";
/* global require module */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogGroupSummary = void 0;
const getLogGroupHeader_1 = require("./getLogGroupHeader");
const chalk = require("chalk");
const orderBy = ([aKey, aCount], [bKey, bCount]) => {
    // count descending
    if (aCount > bCount)
        return -1;
    if (bCount > aCount)
        return 1;
    // key ascending
    if (aKey < bKey)
        return -1;
    if (bKey < aKey)
        return 1;
    // should never happen since keys are unique
    return 0;
};
const getLogGroupSummary = (logs, levels, ignored) => {
    if (logs.size === 0 && !ignored) {
        return null;
    }
    const lines = [`\n ${chalk.bold("\u25cf ")} Suppressed console messages:\n`];
    levels.forEach((level) => {
        const levelMap = logs.get(level);
        if (levelMap) {
            const entries = [...levelMap.entries()].sort(orderBy);
            for (let [key, count] of entries) {
                lines.push(getLogGroupHeader_1.getLogGroupHeader(level, key, count));
            }
        }
    });
    if (ignored) {
        lines.push(getLogGroupHeader_1.getSkippedHeader(ignored));
    }
    return lines;
};
exports.getLogGroupSummary = getLogGroupSummary;
//# sourceMappingURL=getLogGroupSummary.js.map