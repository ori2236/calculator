import type { OperatorNote } from "./LabelTypes";

export type Operator = { note: OperatorNote; priority: number };

export type ValidExpression = {
  canBeCalculated: boolean;
  validExpression: string[];
};

export interface CalculateExpression {
  validExpression: string;
  answer: number | null;
}

export interface Stacks {
  operatorsStack: Operator[];
  numbersStack: number[];
}

export interface StacksState extends Stacks {
  depthBonus: number;
}

export interface StopState extends Stacks {
  stopped: boolean;
}
