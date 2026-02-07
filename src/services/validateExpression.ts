import type { ValidExpression } from "../Types/CalculationTypes";
import {
  isNoteLabel,
  isNumberLabel,
  isOperatorLabel,
} from "../Types/LabelTypes";
import { validateNumbers } from "./validateNumbers";
import { validBrackets } from "./validBrackets";

const haveStructureProblems = (splitedExpressionByNotes: string[]) => {
  const oneNumberOnly =
    (splitedExpressionByNotes.length === 1 &&
      isNumberLabel(splitedExpressionByNotes[0])) ||
    (splitedExpressionByNotes.length === 2 &&
      splitedExpressionByNotes[0] === "-" &&
      isNumberLabel(splitedExpressionByNotes[1]));

  return (
    oneNumberOnly ||
    splitedExpressionByNotes.some((note, index, array) => {
      const nextNote = array[index + 1];
      return (
        (isOperatorLabel(note) && nextNote === ")") ||
        (note === "(" && nextNote === ")")
      );
    })
  );
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

export const validateExpression = (expression: string): ValidExpression => {
  const validNumbersExpression = invalidChecks(expression);
  if (!validNumbersExpression.canBeCalculated)
    return {
      canBeCalculated: false,
      validExpression: validNumbersExpression.validExpression,
    };

  const exceptionPattern = /[*/]/;
  const numbersAndOpenBracketPattern = /\)|[0-9.]+/;
  const numbersAndCloseBracketPattern = /\(|[0-9.]+/;

  const deleteAdjacentOperators =
    validNumbersExpression.validExpression.flatMap((note, index, array) => {
      if (index === array.length - 1) return [note];
      const nextNote = array[index + 1];
      const isTwoAdjustOperator =
        isOperatorLabel(note) && isOperatorLabel(nextNote);
      const isException = exceptionPattern.test(note) && nextNote === "-";
      return isTwoAdjustOperator && !isException ? [] : [note];
    });

  if (/[+\-*/]$/.test(deleteAdjacentOperators.join("")))
    return {
      canBeCalculated: false,
      validExpression: deleteAdjacentOperators,
    };

  const validExpression = deleteAdjacentOperators.flatMap(
    (note, index, array) => {
      if (index === 0) return [note];
      const previousNote = array[index - 1];

      const isOpeningBracketAdjustToOperator =
        previousNote === "(" && isOperatorLabel(note) && note !== "-";

      if (isOpeningBracketAdjustToOperator) return [];

      const isMultipicationOperatorNeeded =
        numbersAndOpenBracketPattern.test(previousNote) &&
        numbersAndCloseBracketPattern.test(note);

      return isMultipicationOperatorNeeded ? ["*", note] : [note];
    },
  );

  return {
    canBeCalculated: true,
    validExpression: validExpression,
  };
};
