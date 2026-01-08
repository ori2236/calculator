import { describe, test, expect } from "vitest";
import { IsValidExpressionType, validateNumbers } from "../src/calcExpression";

describe("should join the digits and decimal points and return valid numbers in the expression", () => {
  test("valid integers numbers, should join all the digits", () => {
    const expression = "25+43*(12-89)";
    const expected: IsValidExpressionType = {
      canBeCalc: true,
      validExpression: ["25", "+", "43", "*", "(", "12", "-", "89", ")"],
    };

    const validExpression = validateNumbers(expression);
    expect(validExpression).toEqual(expected);
  });

  test("valid numbers with valid use of decimal point, should join all the digits", () => {
    const expression = "25.4+43*(12.8-89)";
    const expected: IsValidExpressionType = {
      canBeCalc: true,
      validExpression: ["25.4", "+", "43", "*", "(", "12.8", "-", "89", ")"],
    };

    const validExpression = validateNumbers(expression);
    expect(validExpression).toEqual(expected);
  });

  test("a number contain '0' at the middle shouldn't delete the '0'", () => {
    const expression = "503+2";
    const expected: IsValidExpressionType = {
      canBeCalc: true,
      validExpression: ["503", "+", "2"],
    };

    const validExpression = validateNumbers(expression);
    expect(validExpression).toEqual(expected);
  });

  test("a number start with '0', should delete the '0'", () => {
    const expression = "5+03";
    const expected: IsValidExpressionType = {
      canBeCalc: true,
      validExpression: ["5", "+", "3"],
    };

    const validExpression = validateNumbers(expression);
    expect(validExpression).toEqual(expected);
  });

  test("a number contain '0' after decimal point at the middle shouldn't delete the '0'", () => {
    const expression = "0.0005-2";
    const expected: IsValidExpressionType = {
      canBeCalc: true,
      validExpression: ["0.0005", "-", "2"],
    };

    const validExpression = validateNumbers(expression);
    expect(validExpression).toEqual(expected);
  });

  test("a number contain '0' after decimal point at the end should delete the '0'", () => {
    const expression = "0.0005-2.0100+2";
    const expected: IsValidExpressionType = {
      canBeCalc: true,
      validExpression: ["0.0005", "-", "2.01", "+", "2"],
    };

    const validExpression = validateNumbers(expression);
    expect(validExpression).toEqual(expected);
  });

  test("two adjacent decimal points, should leave only one", () => {
    const expression = "95..88+1...23";
    const expected: IsValidExpressionType = {
      canBeCalc: true,
      validExpression: ["95.88", "+", "1.23"],
    };

    const validExpression = validateNumbers(expression);
    expect(validExpression).toEqual(expected);
  });

  test("a few decimal points, should leave only the first one", () => {
    const expression = "2+95.123.456.789";
    const expected: IsValidExpressionType = {
      canBeCalc: true,
      validExpression: ["2", "+", "95.123456789"],
    };

    const validExpression = validateNumbers(expression);
    expect(validExpression).toEqual(expected);
  });

  test("decimal point without a number before, should add '0' before", () => {
    const expression = "24+.5-.496";
    const expected: IsValidExpressionType = {
      canBeCalc: true,
      validExpression: ["24", "+", "0.5", "-", "0.496"],
    };

    const validExpression = validateNumbers(expression);
    expect(validExpression).toEqual(expected);
  });

  test("decimal point without a number after, should return that cannot be calculated", () => {
    const expression = "24+5.-496.";
    const expected: IsValidExpressionType = {
      canBeCalc: false,
      validExpression: ["24", "+", "5.", "-", "496."],
    };

    const validExpression = validateNumbers(expression);
    expect(validExpression).toEqual(expected);
  });
});
