import type { Dispatch, JSX, RefObject, SetStateAction } from "react";
import type { IconLabel, Label, Note } from "./LabelTypes";

export interface ButtonUIProps {
  label: Label;
  onPress: () => void;
}

export type ButtonCover = JSX.Element | Exclude<Label, IconLabel>;

interface ButtonKind {
  handleExpressionChange: (onClick: () => string) => void;
}

export interface deleteAllButtonProps extends ButtonKind{}

export interface deleteButtonProps extends ButtonKind{
  expression: string;
  inputRef: RefObject<HTMLInputElement | null>;
  cursorPositionRef: RefObject<number | null>;
}

export interface EqualButtonProps extends ButtonKind {
  answer: Number | null;
}

export interface NotesButtonProps extends ButtonKind {
  note: Note;
  expression: string;
  inputRef: RefObject<HTMLInputElement | null>;
  cursorPositionRef: RefObject<number | null>;
}