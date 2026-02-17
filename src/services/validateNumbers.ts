import type { ValidExpression } from "../Types/CalculationTypes";
import {
  isBracketsLabel,
  isDigitChar,
  isNumberChar,
  isNumberLabel,
  isOperatorLabel,
  type OperatorNote,
} from "../Types/LabelTypes";

const operatorAfterE = (char: OperatorNote, currentNumber: string) =>
  currentNumber.endsWith("e") && (char === "+" || char === "-");

const doesNeedToConcat = (char: string, currentNumber: string) => {
  return (
    isNumberChar(char) ||
    (isOperatorLabel(char) && operatorAfterE(char, currentNumber))
  );
};

interface SplitExpressionState {
  notes: string[];
  currentNumber: string;
}

const splitExpressionByNotes = (expression: string) => {
  const splitByNumbers = [...expression].reduce<SplitExpressionState>(
    (state, char) =>
      doesNeedToConcat(char, state.currentNumber)
        ? { ...state, currentNumber: state.currentNumber + char }
        : {
            notes: [...state.notes, state.currentNumber, char],
            currentNumber: "",
          },
    { notes: [], currentNumber: "" },
  );

  return [...splitByNumbers.notes, splitByNumbers.currentNumber].filter(
    Boolean,
  );
};

const keepOnlyFirstDecimalPoint = (note: string) => {
  const firstDecimalPointIndex = note.indexOf(".");
  if (firstDecimalPointIndex === -1) return note;

  const beforeDecimalPoint = note.slice(0, firstDecimalPointIndex + 1);
  const afterDecimalPoint = note
    .slice(firstDecimalPointIndex + 1)
    .replaceAll(".", "");
  return beforeDecimalPoint + afterDecimalPoint;
};

const trimZerosAtTheEnd = (number: string): string =>
  number.endsWith("0") ? trimZerosAtTheEnd(number.slice(0, -1)) : number;

const trimZerosAtEnd = (number: string, nextNumber: string) => {
  const shouldTrimZerosAtEnd =
    number.includes(".") &&
    number.endsWith("0") &&
    (isOperatorLabel(nextNumber) || isBracketsLabel(nextNumber));

  return shouldTrimZerosAtEnd ? trimZerosAtTheEnd(number) : number;
};

const trimDecimalPoint = (number: string, nextNumber: string) => {
  const shouldTrimDecimalPoint =
    number.endsWith(".") &&
    (isOperatorLabel(nextNumber) || isBracketsLabel(nextNumber));
  return shouldTrimDecimalPoint ? number.slice(0, -1) : number;
};

const trimZerosAtTheStart = (number: string): string =>
  number.length > 1 && number[0] === "0" && isDigitChar(number[1])
    ? trimZerosAtTheStart(number.slice(1))
    : number;

const trimZeros = (number: string, nextNote: string) => {
  if (number.includes("e")) return number;
  const noZerosAtTheEnd = trimZerosAtEnd(number, nextNote);
  const deleteDecimalPoint = trimDecimalPoint(noZerosAtTheEnd, nextNote);
  return trimZerosAtTheStart(deleteDecimalPoint);
};

const normalizeNumber = (note: string, nextNote: string) => {
  const withLeadingZero = note.startsWith(".") ? `0${note}` : note;
  const onlyOneDecimalPoint = keepOnlyFirstDecimalPoint(withLeadingZero);
  return trimZeros(onlyOneDecimalPoint, nextNote);
};

const endsWithDecimalPoint = (validExpression: string[]) => {
  const lastNote = validExpression.at(-1);
  return lastNote && isNumberLabel(lastNote) && lastNote.endsWith(".");
};

export const validateNumbers = (expression: string): ValidExpression => {
  const splitedExpression = splitExpressionByNotes(expression);

  const validExpression = splitedExpression.map((note, index, array) =>
    isNumberLabel(note) ? normalizeNumber(note, array[index + 1]) : note,
  );

  const canBeCalculated = !endsWithDecimalPoint(validExpression);

  return {
    canBeCalculated,
    validExpression,
  };
};
