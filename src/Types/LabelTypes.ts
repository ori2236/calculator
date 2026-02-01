import type { Dispatch, RefObject, SetStateAction } from "react";

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

export type IconLabel = "delete" | "*";