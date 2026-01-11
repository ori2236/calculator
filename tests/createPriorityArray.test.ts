import { describe, test, expect } from "vitest";
import { createPriorityArray } from "../src/services/calcExpression";

describe("should return the priority of each operator respectively", () => {
  test("simple single operators", () => {
    const expression = ["5", "+", "43", "-", "12", "*", "89", "/", "7"];
    const expected = [1, 1, 2, 2];

    const validExpression = createPriorityArray(expression);
    expect(validExpression).toEqual(expected);
  });

  test("expression with brackets", () => {
    const expression = ["5", "+", "(", "43", "*", "(", "-5", "*", "12", ")", ")", "*", "(", "89", "+", "7", ")"];
    const expected = [1, 4, 5, 6, 2, 3];

    const validExpression = createPriorityArray(expression);
    expect(validExpression).toEqual(expected);
  });

  test("adjacent operators", () => {
    const expression = ["-", "2.5", "*", "-", "12", "+", "(", "89", "/", "-", "7", ")"];
    const expected = [1, 2, 2.5, 1, 4, 4.5];

    const validExpression = createPriorityArray(expression);
    expect(validExpression).toEqual(expected);
  });
});
