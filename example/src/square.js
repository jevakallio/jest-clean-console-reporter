module.exports = function square(n) {
  // info
  console.info("Received value: " + n);

  if (typeof n !== "number") {
    // this error is preserved with rule.keep
    console.error("Received invalid input: " + n);
    return NaN;
  }

  if (!Number.isInteger(n)) {
    // warning
    console.warn("Received a non-integer number: " + n);
  }

  return n * n;
};
