/* global require, module */

const chalk = require('chalk');

// Explicitly reset for these messages since they can get written out in the
// middle of error logging
const ERROR_TEXT = 'ERROR';
const WARN_TEXT = 'WARN';
const LOG_TEXT = 'LOG';
const INFO_TEXT = 'INFO';
const DEBUG_TEXT = 'DEBUG';

const statusByType = {
  error: chalk.supportsColor
    ? chalk.reset.bold.red(` ${ERROR_TEXT} `)
    : ERROR_TEXT,
  warn: chalk.supportsColor
    ? chalk.reset.bold.yellow(` ${WARN_TEXT}  `)
    : WARN_TEXT,
  log: chalk.supportsColor
    ? chalk.reset.bold.cyan(` ${LOG_TEXT}   `)
    : LOG_TEXT,
  info: chalk.supportsColor
    ? chalk.reset.bold.blue(` ${INFO_TEXT}  `)
    : INFO_TEXT,
  debug: chalk.supportsColor
    ? chalk.reset.bold.magenta(` ${DEBUG_TEXT} `)
    : DEBUG_TEXT
};

const formatCount = count => `(${chalk.bold(count.toString())})`;
const formatMessage = key =>
  (key.length > 100 ? `${key.substring(0, 100)}...` : key).replace(
    /[\r\n]+/g,
    ' '
  );

const getLogGroupHeader = (type, key, count) => {
  const status = statusByType[type] || type.toUpperCase();
  return `${status} ${formatCount(count)} ${formatMessage(key)}`;
};

module.exports = getLogGroupHeader;
