const square = require("./square");

describe("square", () => {
  it("squares an integer", () => {
    expect(square(3)).toBe(9);
  });

  it("squares a non-integer number", () => {
    expect(square(2.5)).toBe(6.25);
  });

  it("fails to square a non-number", () => {
    expect(square("bob")).toBe(NaN);
  });
});
