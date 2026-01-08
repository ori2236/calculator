import { describe, test, expect } from "vitest";
import { validBrackets } from "../src/calcExpression";

describe("the expression contains uneven amount of opening and closing brackets", () => {
  test("valid brackets, should return that can be calculated", () => {
    const expression = "1+(5+(4+1))";
    const validExpression = validBrackets([...expression]);
    expect(validExpression).toEqual(true);
  });

  test("more openning brackets than closing, should return that cannot be calculated", () => {
    const expression = "1+(5+(4+1)";
    const validExpression = validBrackets([...expression]);
    expect(validExpression).toEqual(false);
  });

  test("more closing brackets than opening, should return that cannot be calculated", () => {
    const expression = "1+(5+(4+1)+6)-4)+5";
    const validExpression = validBrackets([...expression]);
    expect(validExpression).toEqual(false);
  });
});
