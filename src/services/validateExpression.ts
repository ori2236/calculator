import type { ValidExpression } from "../Types/CalculationTypes";
import {
  isNoteLabel,
  isNumberLabel,
  isOperatorLabel,
} from "../Types/LabelTypes";
import { validateNumbers } from "./validateNumbers";
import { validBrackets } from "./validBrackets";

const isSingleNumberExpression = (tokens: string[]) => {
  if (tokens.length === 1) return isNumberLabel(tokens[0]);
  if (tokens.length === 2) return tokens[0] === "-" && isNumberLabel(tokens[1]);
  return false;
};

const haveStructureProblems = (splitedExpressionByNotes: string[]) => {
  const oneNumberOnly = isSingleNumberExpression(splitedExpressionByNotes);

  const endsWithOperator = isOperatorLabel(
    splitedExpressionByNotes[splitedExpressionByNotes.length - 1],
  );

  const invalidAdjustmentToClosingBracket = splitedExpressionByNotes.some(
    (note, index, array) => {
      const nextNote = array[index + 1];
      return (isOperatorLabel(note) || note === "(") && nextNote === ")";
    },
  );

  return oneNumberOnly || endsWithOperator || invalidAdjustmentToClosingBracket;
};

const invalidChecks = (expression: string): ValidExpression => {
  const validCharsExpression = [...expression].filter((n) => isNoteLabel(n));

  if (!validBrackets(expression)) {
    return {
      canBeCalculated: false,
      validExpression: validCharsExpression,
    };
  }

  const validNumbersExpression = validateNumbers(validCharsExpression.join(""));

  const canBeCalculated =
    validNumbersExpression.canBeCalculated &&
    !haveStructureProblems(validNumbersExpression.validExpression);

  return {
    canBeCalculated,
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
  if (!validNumbersExpression.canBeCalculated)
    return {
      canBeCalculated: false,
      validExpression: validNumbersExpression.validExpression,
    };

  const deletedAdjacentOperators = deleteAdjacentOperators(
    validNumbersExpression.validExpression,
  );

  const validExpression = addMultiplicationOperator(deletedAdjacentOperators);

  return {
    canBeCalculated: true,
    validExpression,
  };
};
