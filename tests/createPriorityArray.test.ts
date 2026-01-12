import { describe, test, expect } from "vitest";
import { createPriorityArrayAndNumbersArray } from "../src/services/calcExpression";

describe("should return the priority of each operator respectively", () => {
  test("simple single operators", () => {
    const expression = ["5", "+", "43", "-", "12", "*", "89", "/", "7"];
    const expected = { priorityArray: [1, 1, 2, 2], numbersArray: [5,43,12,89,7] };

    const twoArrays = createPriorityArrayAndNumbersArray(expression);
    expect(twoArrays).toEqual(expected);
  });

  test("expression with brackets", () => {
    const expression = ["5", "+", "(", "43", "*", "(", "-", "5", "*", "12", ")", ")", "*", "(", "89", "+", "7", ")"];
    const expected = {
      priorityArray: [1, 4, 5, 6, 2, 3],
      numbersArray: [5, 43, 5, 12, 89, 7],
    };

    const twoArrays = createPriorityArrayAndNumbersArray(expression);
    expect(twoArrays).toEqual(expected);
  });

  test("adjacent operators", () => {
    const expression = ["-", "2.5", "*", "-", "12", "+", "(", "89", "/", "-", "7", ")"];
    const expected = {
      priorityArray: [1, 2, 2.5, 1, 4, 4.5],
      numbersArray: [2.5, 12, 89, 7],
    };

    const twoArrays = createPriorityArrayAndNumbersArray(expression);
    expect(twoArrays).toEqual(expected);
  });
});
