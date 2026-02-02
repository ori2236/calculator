import type { Operator } from "./LabelTypes";

export type OperatorObject = { operatorNote: Operator; priority: number };

export type ValidExpression = {
  canBeCalculate: boolean;
  validExpressionAsArray: string[];
};

export interface CalculateExpression {
  validExpression: string;
  answer: number | null;
}

export interface Stacks {
  operatorsStack: OperatorObject[];
  numbersStack: number[];
}

export interface StacksState {
  operatorsStack: OperatorObject[];
  numbersStack: number[];
  depthBonus: number;
}

export interface StopState {
  operatorsStack: OperatorObject[];
  numbersStack: number[];
  stopped: boolean;
}
