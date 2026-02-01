import type { Operator } from "./LabelTypes";

export type OperatorAndPriority = { operator: Operator; priority: number };

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