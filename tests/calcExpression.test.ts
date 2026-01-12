import { describe, test, expect } from "vitest";
import {
  calcExpression,
  CalculateExpression,
} from "../src/services/calcExpression";

describe("same priority level, should return the same expression and the answer of the expression", () => {
  test("all the operators with priority 1 ('+','-')", () => {
    const expression = "5+2-3+6";
    const expected: CalculateExpression = {
      validExpression: expression,
      answer: 10,
    };

    const finalAnswer = calcExpression(expression);
    expect(finalAnswer).toEqual(expected);
  });

  test("the expression starts with '-'", () => {
    const expression = "-5+2-3+6";
    const expected: CalculateExpression = {
      validExpression: expression,
      answer: 0,
    };

    const finalAnswer = calcExpression(expression);
    expect(finalAnswer).toEqual(expected);
  });

  test("all the operators with priority 2 ('*','/')", () => {
    const expression = "2*3*3/6";
    const expected: CalculateExpression = {
      validExpression: expression,
      answer: 2,
    };

    const finalAnswer = calcExpression(expression);
    expect(finalAnswer).toEqual(expected);
  });

  test("division by 0, shoult return answer as null", () => {
    const expression = "10/(5-2*3)";
    const expected: CalculateExpression = {
      validExpression: expression,
      answer: null,
    };

    const finalAnswer = calcExpression(expression);
    expect(finalAnswer).toEqual(expected);
  });

  test("answer ends with a lot of digits after the decimal point", () => {
    const expression = "1/3";
    const expected: CalculateExpression = {
      validExpression: expression,
      answer: 0.3333333333333333,
    };

    const finalAnswer = calcExpression(expression);
    expect(finalAnswer).toEqual(expected);
  });
});

describe("diffrent priorities levels, should return the same expression and the answer of the expression", () => {
  test("all the operators with priorities 1 or 2 (no brackets)", () => {
    const expression = "5+2*3+6";
    const expected: CalculateExpression = {
      validExpression: expression,
      answer: 13,
    };

    const finalAnswer = calcExpression(expression);
    expect(finalAnswer).toEqual(expected);
  });

  test("the expression starts with brackets", () => {
    const expression = "(3+1+(2*(2+1-2*1+1)))";
    const expected: CalculateExpression = {
      validExpression: expression,
      answer: 8,
    };

    const finalAnswer = calcExpression(expression);
    expect(finalAnswer).toEqual(expected);
  });

  test("brackets on single number", () => {
    const expression = "5+(16*(2))";
    const expected: CalculateExpression = {
      validExpression: expression,
      answer: 37,
    };

    const finalAnswer = calcExpression(expression);
    expect(finalAnswer).toEqual(expected);
  });

  test("the priority level is not integer", () => {
    const expression = "-2*-3/-4";
    const expected: CalculateExpression = {
      validExpression: expression,
      answer: -1.5,
    };

    const finalAnswer = calcExpression(expression);
    expect(finalAnswer).toEqual(expected);
  });
});
