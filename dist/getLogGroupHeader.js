"use strict";
/* global require, module */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSkippedHeader = exports.getLogGroupHeader = exports.formatMessage = exports.formatCount = void 0;
const chalk = require("chalk");
// Explicitly reset for these messages since they can get written out in the
// middle of error logging
const ERROR_TEXT = "ERROR";
const WARN_TEXT = "WARN";
const LOG_TEXT = "LOG";
const INFO_TEXT = "INFO";
const DEBUG_TEXT = "DEBUG";
const statusByType = {
    error: chalk.supportsColor
        ? chalk.reset.bold.red(` ${ERROR_TEXT}`.padEnd(7))
        : ERROR_TEXT,
    warn: chalk.supportsColor
        ? chalk.reset.bold.yellow(` ${WARN_TEXT}`.padEnd(7))
        : WARN_TEXT,
    log: chalk.supportsColor
        ? chalk.reset.bold.cyan(` ${LOG_TEXT}`.padEnd(7))
        : LOG_TEXT,
    info: chalk.supportsColor
        ? chalk.reset.bold.blue(` ${INFO_TEXT}`.padEnd(7))
        : INFO_TEXT,
    debug: chalk.supportsColor
        ? chalk.reset.bold.magenta(` ${DEBUG_TEXT}`.padEnd(7))
        : DEBUG_TEXT,
};
const formatCount = (count) => {
    const chars = count.toString();
    const chalked = chalk.bold(chars);
    const formatChars = chalked.length - chars.length;
    return `${chalked}`.padEnd(5 + formatChars, " ");
};
exports.formatCount = formatCount;
const formatMessage = (key) => {
    const truncated = key.length > 100 ? `${key.substring(0, 100)}...` : key;
    const singleline = truncated.replace(/[\r\n]+/g, " ");
    return singleline.replace("@TODO", chalk.bold("@TODO"));
};
exports.formatMessage = formatMessage;
const getLogGroupHeader = (type, key, count) => {
    const status = statusByType[type] || type.toUpperCase();
    return `${status} ${exports.formatCount(count)} ${exports.formatMessage(key)}`;
};
exports.getLogGroupHeader = getLogGroupHeader;
const getSkippedHeader = (count) => {
    const label = " SKIP".padEnd(7);
    const message = `${label} ${exports.formatCount(count)} messages were filtered`;
    return chalk.supportsColor ? chalk.reset.gray(message) : message;
};
exports.getSkippedHeader = getSkippedHeader;
//# sourceMappingURL=getLogGroupHeader.js.map