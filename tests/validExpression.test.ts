import { describe, test, expect } from "vitest";
import { validateExpression } from "../src/services/validateExpression";
import type { ValidExpression } from "../src/services/validateExpression";

describe("the expression should stay the same", () => {
  test("valid expression without bracket", () => {
    const expression = "10+2*5+2";
    const expected: ValidExpression = {
      canBeCalc: true,
      validExpression: ["10", "+", "2", "*", "5", "+", "2"],
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("valid expression with simple brackets", () => {
    const expression = "10+2*(4+1)+2";
    const expected: ValidExpression = {
      canBeCalc: true,
      validExpression: ["10", "+", "2", "*", "(", "4", "+", "1", ")", "+", "2"],
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("valid expression with unnecessary brackets", () => {
    const expression = "10+2*(4+1)+((2))";
    const expected: ValidExpression = {
      canBeCalc: true,
      validExpression: [
        "10",
        "+",
        "2",
        "*",
        "(",
        "4",
        "+",
        "1",
        ")",
        "+",
        "(",
        "(",
        "2",
        ")",
        ")",
      ],
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("valid expression with nested brackets", () => {
    const expression = "2*(3+(4*(5-1)))";
    const expected: ValidExpression = {
      canBeCalc: true,
      validExpression: [
        "2",
        "*",
        "(",
        "3",
        "+",
        "(",
        "4",
        "*",
        "(",
        "5",
        "-",
        "1",
        ")",
        ")",
        ")",
      ],
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("closing bracket after operator, should return that cannot be calculated", () => {
    const expression = "1+(5+(2+))";
    const expected: ValidExpression = {
      canBeCalc: false,
      validExpression: ["1", "+", "(", "5", "+", "(", "2", "+", ")", ")"],
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("empty brackets should be invalid, should return that cannot be calculated", () => {
    const expression = "1+()+2";
    const expected: ValidExpression = {
      canBeCalc: false,
      validExpression: ["1", "+", "(", ")", "+", "2"],
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("the expression end with operator or opening brackets, should return that cannot be calculated", () => {
    const expression = "95+5+10-4-";
    const expected: ValidExpression = {
      canBeCalc: false,
      validExpression: ["95", "+", "5", "+", "10", "-", "4", "-"],
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });
});

describe("the expression should change in the middle", () => {
  test("a few adjacent operators, should leave the last operator (except '/-' and '*-')", () => {
    const expression = "95*/+5/+10+-4*/8";
    const expected: ValidExpression = {
      canBeCalc: true,
      validExpression: ["95", "+", "5", "+", "10", "-", "4", "/", "8"],
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("a opening bracket is adjacent to operator (except '-'), should delete the operator", () => {
    const expression = "2+(5+1)+(+2)";
    const expected: ValidExpression = {
      canBeCalc: true,
      validExpression: ["2", "+", "(", "5", "+", "1", ")", "+", "(", "2", ")"],
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("a bracket or a number is adjacent to a bracket, should add '*' between them", () => {
    const expression = "2(5+1)8+(4)(3)";
    const expected: ValidExpression = {
      canBeCalc: true,
      validExpression: [
        "2",
        "*",
        "(",
        "5",
        "+",
        "1",
        ")",
        "*",
        "8",
        "+",
        "(",
        "4",
        ")",
        "*",
        "(",
        "3",
        ")",
      ],
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("invalid characters in the expression", () => {
    const expression = "10a+2*5+!2";
    const expected: ValidExpression = {
      canBeCalc: true,
      validExpression: ["10", "+", "2", "*", "5", "+", "2"],
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });
});
