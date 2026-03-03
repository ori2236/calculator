import type { ValidExpression } from "../Types/CalculationTypes";
import {
  isNoteLabel,
  isNumberLabel,
  isOperatorLabel,
} from "../Types/LabelTypes";
import type { ValidationError } from "../Types/ValidationErrorTypes";
import { validateNumbers } from "./validateNumbers";
import { validBrackets } from "./validBrackets";

const isSingleNumberExpression = (expression: string[]) => {
  if (expression.length === 1) return isNumberLabel(expression[0]);
  if (expression.length === 2)
    return expression[0] === "-" && isNumberLabel(expression[1]);
  return false;
};

const oneNumberOnly = (expression: string[]): ValidationError | null =>
  isSingleNumberExpression(expression) ? "OneNumberOnly" : null;

const operatorInEdges = (expression: string[]): ValidationError | null => {
  const startsWithOperator =
    isOperatorLabel(expression[0]) && expression[0] !== "-";
  const endsWithOperator = isOperatorLabel(expression[expression.length - 1]);
  return startsWithOperator || endsWithOperator ? "OperatorInEdges" : null;
};

const invalidAdjustmentToClosingBracket = (
  expression: string[],
): ValidationError | null => {
  const invalidAdjustmentToClosingBracket = expression.some(
    (note, index, array) => {
      const nextNote = array[index + 1];
      return (isOperatorLabel(note) || note === "(") && nextNote === ")";
    },
  );

  return invalidAdjustmentToClosingBracket
    ? "InvalidAdjustmentToClosingBracket"
    : null;
};

const haveStructureErrors = (expression: string[]) => {
  const oneNumberOnlyError = oneNumberOnly(expression);

  const operatorInEdgesError = operatorInEdges(expression);

  const invalidAdjustmentToClosingBracketError =
    invalidAdjustmentToClosingBracket(expression);

  return (
    oneNumberOnlyError ||
    operatorInEdgesError ||
    invalidAdjustmentToClosingBracketError
  );
};

const invalidChecks = (expression: string): ValidExpression => {
  const validCharsExpression = [...expression]
    .filter((n) => isNoteLabel(n))
    .join("");
  const validNumbersExpression = validateNumbers(validCharsExpression);

  const validationError = validBrackets(validCharsExpression)
    ? validNumbersExpression.validationError
    : "InvalidBrackets";

  return {
    validationError,
    validExpression: validNumbersExpression.validExpression,
  };
};

const deleteAdjacentOperators = (expression: string[]) =>
  expression.flatMap((note, index, array) => {
    if (index === array.length - 1) return [note];
    const nextNote = array[index + 1];
    const isTwoAdjustOperator =
      isOperatorLabel(note) && isOperatorLabel(nextNote);
    const isException = (note === "*" || note === "/") && nextNote === "-";
    return isTwoAdjustOperator && !isException ? [] : [note];
  });

const isNumberOrCloseParen = (note: string) =>
  note === ")" || isNumberLabel(note);
const isNumberOrOpenParen = (note: string) =>
  note === "(" || isNumberLabel(note);

const addMultiplicationOperator = (expression: string[]) =>
  expression.flatMap((note, index, array) => {
    if (index === 0) return [note];
    const previousNote = array[index - 1];

    const isOpeningBracketAdjustToOperator =
      previousNote === "(" && isOperatorLabel(note) && note !== "-";

    if (isOpeningBracketAdjustToOperator) return [];

    const shouldAddMultiplicationOperator =
      isNumberOrCloseParen(previousNote) && isNumberOrOpenParen(note);

    return shouldAddMultiplicationOperator ? ["*", note] : [note];
  });

export const validateExpression = (expression: string): ValidExpression => {
  const validNumbersExpression = invalidChecks(expression);

  const deletedAdjacentOperators = deleteAdjacentOperators(
    validNumbersExpression.validExpression,
  );
  const validExpression = addMultiplicationOperator(deletedAdjacentOperators);

  const validationError =
    validNumbersExpression.validationError ||
    haveStructureErrors(validExpression);

  return {
    validationError,
    validExpression,
  };
};
