import type { ValidExpression } from "../Types/CalculationTypes";
import {
  isDigitLabel,
  isNoteLabel,
  isOperatorLabel
} from "../Types/LabelTypes";

export const validBrackets = (expression: string): boolean => {
  try {
    const counter = [...expression].reduce((counter, note) => {
      if (note === "(") return counter + 1;
      else if (note === ")") {
        if (counter - 1 < 0) throw new Error("invalid brackets");
        return counter - 1;
      }
      return counter;
    }, 0);

    return counter === 0;
  } catch (e) {
    return false;
  }
};

const endsWithDecimalPoint = (validExpression: string[]) => {
  return validExpression.some((note) => {
    return isDigitLabel(note) && /\.$/.test(note);
  });
};

export const validateNumbers = (expression: string): ValidExpression => {
  const splitExpression = expression.match(/[0-9.]+|[+\-*/()]/g) ?? [];
  const validExpression = splitExpression.map((note, index, arr) => {
    if (!isDigitLabel(note)) return note;
    if (note.startsWith(".")) note = "0" + note;

    const firstDecimalPointIndex = note.indexOf(".");
    if (firstDecimalPointIndex !== -1) {
      const before = note.slice(0, firstDecimalPointIndex + 1);
      const after = note.slice(firstDecimalPointIndex + 1).replaceAll(".", "");
      note = before + after;
    }

    const nextNote = arr[index + 1];
    if (/(\.\d*?)0+$/.test(note) && /[+\-*/()]/.test(nextNote)) {
      note = note.replace(/0+$/, "");
      note = note.replace(/\.$/, "");
    }

    return note.replace(/^0+(?=[0-9])/, "");
  });

  const canBeCalculate = !endsWithDecimalPoint(validExpression);

  return {
    canBeCalculate: canBeCalculate && validExpression.length > 1,
    validExpressionAsArray: validExpression,
  };
};

export const validateExpression = (expression: string): ValidExpression => {
  const expressionArray = [...expression];
  const validCharsExpression = expressionArray.filter((note) =>
    isNoteLabel(note),
  );

  if (!validBrackets(expression))
    return {
      canBeCalculate: false,
      validExpressionAsArray: validCharsExpression,
    };

  const {
    canBeCalculate: allNumbersAreValids,
    validExpressionAsArray: validNumbersExpression,
  } = validateNumbers(validCharsExpression.join(""));

  const firstNonBadStart = validNumbersExpression.findIndex(
    (t) => !(isOperatorLabel(t) && t !== "-"),
  );

  const validStartAndNumbersExpression =
    firstNonBadStart === -1
      ? []
      : validNumbersExpression.slice(firstNonBadStart);

  const str = validStartAndNumbersExpression.join("");
  const invalidChecks = () =>
    !validStartAndNumbersExpression.length ||
    !allNumbersAreValids ||
    /[+\-*/]\)/.test(str) ||
    /\(\)/.test(str) ||
    /^-?[0-9.]+$/.test(str);

  if (invalidChecks())
    return {
      canBeCalculate: false,
      validExpressionAsArray: validStartAndNumbersExpression,
    };

  const exceptionPattern = /[*/]/;
  const numbersAndOpenBracketPattern = /\)|[0-9.]+/;
  const numbersAndCloseBracketPattern = /\(|[0-9.]+/;

  const deleteAdjacentOperators = validStartAndNumbersExpression.flatMap(
    (note, index, arr) => {
      if (index === arr.length - 1) return [note];
      const nextNote = arr[index + 1];
      const isTwoAdjustOperator =
        isOperatorLabel(note) && isOperatorLabel(nextNote);
      const isException = exceptionPattern.test(note) && nextNote === "-";
      return isTwoAdjustOperator && !isException ? [] : [note];
    },
  );

  if (/[+\-*/]$/.test(deleteAdjacentOperators.join("")))
    return {
      canBeCalculate: false,
      validExpressionAsArray: deleteAdjacentOperators,
    };

  const validExpression = deleteAdjacentOperators.flatMap(
    (note, index, arr) => {
      if (index === 0) return [note];
      const previousNote = arr[index - 1];

      const isOpeningBracketAdjustToOperator =
        previousNote === "(" && isOperatorLabel(note) && note !== "-";

      if (isOpeningBracketAdjustToOperator) return [];

      const isMultipicationOperatorNeeded =
        numbersAndOpenBracketPattern.test(previousNote) &&
        numbersAndCloseBracketPattern.test(note);

      return isMultipicationOperatorNeeded ? ["*", note] : [note];
    },
  );

  return { canBeCalculate: true, validExpressionAsArray: validExpression };
};
