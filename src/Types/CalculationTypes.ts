import type { OperatorNote, ValidationError } from "./LabelTypes";

export type AnswerLine = number | ValidationError;
export type Operator = { note: OperatorNote; priority: number };

export type ValidExpression = {
  validationError: ValidationError | null;
  validExpression: string[];
};

export interface CalculateExpression {
  validExpression: string;
  answer: AnswerLine;
}

export interface Stacks {
  operatorsStack: Operator[];
  numbersStack: number[];
  validationError: ValidationError | null;
}

export interface StacksState extends Stacks {
  depthBonus: number;
}

export interface StopState extends Stacks {
  stopped: boolean;
}
