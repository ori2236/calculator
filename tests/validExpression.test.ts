import { describe, test, expect } from "vitest";
import { validateExpression } from "../src/calcExpression";
import type { IsValidType } from "../src/calcExpression";

describe("the expression should stay the same", () => {
  test("invalid characters in the expression", () => {
    const expression = "10a+2*5+!2";
    const expected: IsValidType = {
      canBeCalc: true,
      validExpression: expression,
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("valid expression without bracket", () => {
    const expression = "10+2*5+2";
    const expected: IsValidType = {
      canBeCalc: true,
      validExpression: expression,
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("valid expression with simple brackets", () => {
    const expression = "10+2*(4+1)+2";
    const expected: IsValidType = {
      canBeCalc: true,
      validExpression: "10+2*(4+1)+2",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("valid expression with unnecessary brackets", () => {
    const expression = "10+2*(4+1)+((2))";
    const expected: IsValidType = {
      canBeCalc: true,
      validExpression: "10+2*(4+1)+((2))",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("valid expression with nested brackets", () => {
    const expression = "2*(3+(4*(5-1)))";
    const expected: IsValidType = {
      canBeCalc: true,
      validExpression: "2*(3+(4*(5-1)))",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("closing bracket after operator, should return that cannot be calculated", () => {
    const expression = "1+(5+(2+)";
    const expected: IsValidType = {
      canBeCalc: false,
      validExpression: "1+(5+(2+)",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("empty brackets should be invalid, should return that cannot be calculated", () => {
    const expression = "1+()+2";
    const expected: IsValidType = {
      canBeCalc: false,
      validExpression: "1+()+2",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });
});

describe("the expression should change in the middle", () => {
  test("two adjacent operators, should leave the second operator", () => {
    const expression = "95*5+10+-";
    const expected: IsValidType = {
      canBeCalc: false,
      validExpression: "95*5+10-",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("a closing bracket is adjacent to operator, should delete the operator", () => {
    const expression = "2+(5+1)+(+2)";
    const expected: IsValidType = {
      canBeCalc: false,
      validExpression: "2+(5+1)+(2)",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("a number is adjacent to a bracket, should add '*' between them", () => {
    const expression = "2(5+1)8+4(3)";
    const expected: IsValidType = {
      canBeCalc: false,
      validExpression: "2*(5+1)*8+4*(3)",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("a bracket is adjacent to a bracket, should add '*' between them", () => {
    const expression = "2+(5+1)(";
    const expected: IsValidType = {
      canBeCalc: false,
      validExpression: "2+(5+1)*(",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("a number start with '0', should delete the '0'", () => {
    const expression = "5+03";
    const expected: IsValidType = {
      canBeCalc: true,
      validExpression: "5+3",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("a number contain '0' after decimal point at the middle shouldn't delete the '0'", () => {
    const expression = "0.0005+2";
    const expected: IsValidType = {
      canBeCalc: true,
      validExpression: "0.0005+2",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("a number contain '0' at the middle shouldn't delete the '0'", () => {
    const expression = "503";
    const expected: IsValidType = {
      canBeCalc: true,
      validExpression: "503",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("two adjacent decimal points, should leave only one", () => {
    const expression = "95..";
    const expected: IsValidType = {
      canBeCalc: false,
      validExpression: "95.",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });
});

describe("the expression contains uneven amount of opening and closing brackets or brackets in incorrect order", () => {
  test("more openning brackets than closing, should return that cannot be calculated", () => {
    const expression = "1+(5+(4+1)";
    const expected: IsValidType = {
      canBeCalc: false,
      validExpression: "1+(5+(4+1)",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("more closing brackets than opening, should return that cannot be calculated", () => {
    const expression = "1+(5+(4+1)+6)-4)+5";
    const expected: IsValidType = {
      canBeCalc: false,
      validExpression: "1+(5+(4+1)+6)-4)+5",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });

  test("brackets with only operator, should return that cannot be calculated", () => {
    const expression = "1+(+)+2";
    const expected: IsValidType = {
      canBeCalc: false,
      validExpression: "1+(+)+2",
    };

    const validExpression = validateExpression(expression);
    expect(validExpression).toEqual(expected);
  });
});
