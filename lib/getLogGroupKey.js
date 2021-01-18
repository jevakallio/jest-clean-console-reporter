/* global module */
const matchWith = (matcher, message, type) => {
  if (matcher instanceof RegExp) {
    return matcher.test(message);
  }
  if (typeof matcher === "string") {
    if (matcher === message) {
      return true;
    } else {
      return message.match(matcher);
    }
  }
  if (typeof matcher === "function") {
    return matcher(message, type);
  }

  throw new Error("Filter must be a string, function or a regular expression");
};

const formatMessage = (formatter, message, type, matcher) => {
  if (typeof formatter === "undefined") {
    return null;
  }

  if (typeof formatter === "function") {
    return formatter(message, type, matcher);
  }

  if (typeof formatter === "string") {
    return formatter;
  }

  if (formatter === null) {
    return null;
  }

  return message;
};

const getLogGroupKey = (rules, message, type) => {
  for (let { match: matcher, group: formatter, keep = false } of rules) {
    if (matchWith(matcher, message, type)) {
      return [formatMessage(formatter, message, type, matcher), keep];
    }
  }

  return [];
};

module.exports = getLogGroupKey;
