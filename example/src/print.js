"use strict";

module.exports = function print(n) {
  console.info("Received value: " + n);

  // throws when "n" is not a number
  return n.toFixed(2);
};
