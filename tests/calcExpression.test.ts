import { describe, test, expect } from "vitest";
import { calcExpression } from "../src/services/calcExpression";

describe("same priority level for all the tests, should return the same expression and the answer of the expression", () => {
  test("all the operators with priority 1 ('+','-')", () => {
    const expression = "5+2-3+6";

    const answer = calcExpression(expression).answer;
    expect(answer).toEqual(10);
  });

  test("the expression starts with '-'", () => {
    const expression = "-5+2-3+6";

    const answer = calcExpression(expression).answer;
    expect(answer).toEqual(0);
  });

  test("all the operators with priority 2 ('*','/')", () => {
    const expression = "2*3*3/6";

    const answer = calcExpression(expression).answer;
    expect(answer).toEqual(3);
  });

  test("division by 0, shoult return answer as null", () => {
    const expression = "10/(2*3*0)";

    const answer = calcExpression(expression).answer;
    expect(answer).toEqual("Can't divide by 0");
  });

  test("answer ends with a lot of digits after the decimal point", () => {
    const expression = "1/3";

    const answer = calcExpression(expression).answer;
    expect(answer).toEqual(0.3333333333333333);
  });
});

describe("diffrent priorities levels, should return the same expression and the answer of the expression", () => {
  test("all the operators with priorities 1 or 2 (no brackets)", () => {
    const expression = "5+2*3+6";

    const answer = calcExpression(expression).answer;
    expect(answer).toEqual(17);
  });

  test("the expression starts with brackets", () => {
    const expression = "(3+1+(2*(2+1-2*1+1)))";

    const answer = calcExpression(expression).answer;
    expect(answer).toEqual(8);
  });

  test("brackets on single number", () => {
    const expression = "5+(16*(2))";

    const answer = calcExpression(expression).answer;
    expect(answer).toEqual(37);
  });

  test("the priority level is not integer", () => {
    const expression = "-2*-3/-4";

    const answer = calcExpression(expression).answer;
    expect(answer).toEqual(-1.5);
  });
});
