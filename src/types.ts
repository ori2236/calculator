import type { Dispatch, RefObject, SetStateAction } from "react";
/*
export const labels = [
  "AC", "(", ")", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "delete", "=",
] as const;
*/
export const digits = [
  "0", "1", "2", "3", "4", "5", "6","7", "8", "9", "."
] as const;
export type Digit = (typeof digits)[number];

export const brackets = ["(", ")"] as const;
export type Bracket = (typeof brackets)[number];

export const operators = ["+", "-", "*", "/"] as const;
export type Operator = (typeof operators)[number];

export const specialNotes = ["AC", "delete", "="] as const;
export type SpecialNotes = (typeof specialNotes)[number];

export const labels = [...digits, ...brackets, ...operators, ...specialNotes] as const;
export type Label = (typeof labels)[number];

export type Note = Exclude<Label, SpecialNotes>;

export const gridLabels: Label[] = [
  "AC", "(", ")", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "delete", "=",
];

export type OperatorAndPriority = { operator: Operator, priority: number };

export type ValidExpression = {
  canBeCalc: boolean;
  validExpression: string[];
};

export interface CalculateExpression {
  validExpression: string;
  answer: number | null;
}

export interface Arrays {
  operatorsArray: OperatorAndPriority[];
  numbersArray: number[];
}

export interface PrecedenceAndArrays {
  operatorsArray: OperatorAndPriority[];
  numbersArray: number[];
  base: number;
}

export interface StopSignalAndArrays {
  operatorsArray: OperatorAndPriority[];
  numbersArray: number[];
  stopped: boolean;
}

export interface DisplayProps {
  expression: string,
  inputRef: RefObject<HTMLInputElement | null>,
  cursorPositionRef: RefObject<number | null>,
  answer: number | null
}

export interface ButtonsGridProps {
  expression: string,
  setExpression: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement | null>,
  cursorPositionRef: RefObject<number | null>,
  answer: number | null
  setAnswer: Dispatch<SetStateAction<number | null>>;
}

export interface ButtonProps extends ButtonsGridProps {
  label: Label;
}