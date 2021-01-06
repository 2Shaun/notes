const { expect } = require("@jest/globals");
const exercises04 = require("./exercises04");

it("curry add", () => {
  expect(exercises04.curry((x, y) => x + y)(1, 2)).toBe(3);
  expect(exercises04.curry((x, y) => x + y)(1)(2)).toBe(3);
  expect(exercises04.curry((x, y, z) => x + y + z)(1)(2)(3)).toBe(6);
});

it("increment", () => {
  expect(exercises04.increment(4)).toBe(5);
  expect(exercises04.increment(0)).toBe(1);
  expect(exercises04.increment(-100)).toBe(-99);
});

it("double", () => {
  expect(exercises04.double(4)).toBe(8);
  expect(exercises04.double(0)).toBe(0);
  expect(exercises04.double(-100)).toBe(-200);
});

it("increment then double", () => {
  expect(exercises04.incrementThenDouble(4)).toBe(10);
  expect(exercises04.incrementThenDouble(0)).toBe(2);
  expect(exercises04.incrementThenDouble(-100)).toBe(-198);
});

it("halveThenDouble", () => {
  let i = 0;
  for (i = 0; i <= 100; i++) {
    expect(exercises04.halveThenDouble(i)).toBe(i);
  }
});

it("split by spaces", () => {
  expect(exercises04.splitBySpaces("these are my unit tests for ch4")).toBe([
    "these",
    "are",
    "my",
    "unit",
    "tests",
    "for",
    "ch4",
  ]);
});
