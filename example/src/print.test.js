const print = require("./print");

describe("print", () => {
  it("prints a number", () => {
    expect(print(25 / 2)).toBe("12.50");
  });

  it("crashes when passed a non-number", () => {
    // this test will fail
    expect(() => print("100")).toThrow();
  });
});
