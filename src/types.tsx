import type { Dispatch, RefObject, SetStateAction } from "react";

export const labels = [
  "AC", "(", ")", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "delete", "=",
] as const;

export type Label = (typeof labels)[number];

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
  expressionLength: number,
  answer: number | null
  setAnswer: Dispatch<SetStateAction<number | null>>;
}

export interface ButtonProps extends ButtonsGridProps {
  label: Label;
}