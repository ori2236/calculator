import type { ValidExpression } from "../Types/CalculationTypes";
import {
  isBracketsLabel,
  isDigitChar,
  isNumberChar,
  isNumberLabel,
  isOperatorLabel,
} from "../Types/LabelTypes";

const endsWithDecimalPoint = (validExpression: string[]) => {
  return validExpression.some((note) => {
    return isNumberLabel(note) && note.at(-1) === ".";
  });
};

export interface SplitedExpressByNumbers {
  tokens: string[];
  current: string;
}

const splitExpressionByNotes = (expression: string) => {
  const splitByNumbers = [...expression].reduce<SplitedExpressByNumbers>(
    (state, char) =>
      isNumberChar(char)
        ? { ...state, current: state.current + char }
        : { tokens: [...state.tokens, state.current, char], current: "" },
    { tokens: [], current: "" },
  );

  return [...splitByNumbers.tokens, splitByNumbers.current].filter(Boolean);
};

const keepOnlyFirstDecimalPoint = (note: string) => {
  const firstDecimalPointIndex = note.indexOf(".");
  if (firstDecimalPointIndex === -1) return note;

  const before = note.slice(0, firstDecimalPointIndex + 1);
  const after = note.slice(firstDecimalPointIndex + 1).replaceAll(".", "");
  return before + after;
};

const shouldTrimZerosAtEnd = (note: string, nextNote: string) =>
  note.includes(".") &&
  note.endsWith("0") &&
  (isOperatorLabel(nextNote) || isBracketsLabel(nextNote));

const trimZerosAtTheEnd = (number: string): string =>
  number.endsWith("0") ? trimZerosAtTheEnd(number.slice(0, -1)) : number;

const trimZerosAtTheStart = (number: string): string =>
  number.length > 1 && number[0] === "0" && isDigitChar(number[1])
    ? trimZerosAtTheStart(number.slice(1))
    : number;

const trimZerosAndPoint = (number: string): string => {
  const noZerosAtTheEnd = trimZerosAtTheEnd(number);
  const deleteDecimalPoint = noZerosAtTheEnd.endsWith(".")
    ? noZerosAtTheEnd.slice(0, -1)
    : noZerosAtTheEnd;
  return trimZerosAtTheStart(deleteDecimalPoint);
};

const normalizeNumber = (note: string, nextNote: string) => {
  const withLeadingZero = note.startsWith(".") ? `0${note}` : note;
  const onlyOneDecimalPoint = keepOnlyFirstDecimalPoint(withLeadingZero);
  const trimmedZerosAtEnd = shouldTrimZerosAtEnd(onlyOneDecimalPoint, nextNote)
    ? trimZerosAndPoint(onlyOneDecimalPoint)
    : onlyOneDecimalPoint;
  return trimZerosAtTheStart(trimmedZerosAtEnd);
};

export const validateNumbers = (expression: string): ValidExpression => {
  const splitedExpression = splitExpressionByNotes(expression);

  const validNumbersExpression = splitedExpression.map((note, index, array) =>
    isNumberLabel(note) ? normalizeNumber(note, array[index + 1]) : note,
  );

  const canBeCalculated = !endsWithDecimalPoint(validNumbersExpression);

  return {
    canBeCalculated: canBeCalculated && validNumbersExpression.length > 1,
    validExpression: validNumbersExpression,
  };
};
