import type { Dispatch, JSX, RefObject, SetStateAction } from "react";
import type { IconLabel, Label, Note } from "./LabelTypes";

export interface ButtonUIProps {
  label: Label;
  onPress: () => void;
}

export type ButtonCover = JSX.Element | Exclude<Label, IconLabel>;

export interface ButtonsGridProps {
    expression: string,
    setExpression: Dispatch<SetStateAction<string>>;
    inputRef: RefObject<HTMLInputElement | null>,
    cursorPositionRef: RefObject<number | null>,
    answer: number | null
    setAnswer: Dispatch<SetStateAction<number | null>>;
}

export interface deleteAllButtonProps {
  handleExpressionChange: (onClick: () => string) => void;
}

export interface deleteButtonProps {
  handleExpressionChange: (onClick: () => string) => void;
  expression: string;
  inputRef: RefObject<HTMLInputElement | null>;
  cursorPositionRef: RefObject<number | null>;
}

export interface EqualButtonProps {
    handleExpressionChange: (onClick: () => string) => void;
    answer: Number | null;
}

export interface NotesButtonProps {
  handleExpressionChange: (onClick: () => string) => void;
  note: Note;
  expression: string;
  inputRef: RefObject<HTMLInputElement | null>;
  cursorPositionRef: RefObject<number | null>;
}

export interface DisplayProps {
  expression: string,
  inputRef: RefObject<HTMLInputElement | null>,
  cursorPositionRef: RefObject<number | null>,
  answer: number | null
}