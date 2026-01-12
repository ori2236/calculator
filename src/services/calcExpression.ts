import type { Label, Operator } from "../types";
import { validateExpression } from "./validateExpression";

export interface CalculateExpression {
  validExpression: string;
  answer: number | null;
}

export interface CreateTwoArrays {
  priorityArray: number[];
  numbersArray: number[];
}

const operatorsPriorities: Record<Operator, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

const supportPriorities: Partial<Record<Label, number>> = {
  "(": 2,
  ")": -2,
  "*": 0.5,
  "/": 0.5,
};

interface BaseAndArrays {
  base: number;
  priorityOperatorsArray: number[];
  numbersArray: number[];
}

const isOperatorLabel = (char: string): char is Operator => {
  const operatorPattern = /[+\-*/]/;
  return operatorPattern.test(char);
};

const isNumberLabel = (char: string): char is Label => {
  const numbersPattern = /[0-9.]+/;
  return numbersPattern.test(char);
};

const getExtraPriorityIfNeeded = (arr: string[], currentIndex: number) => {
  if (currentIndex === 0) return 0;
  return /[-]/.test(arr[currentIndex]) && /[/*]/.test(arr[currentIndex-1]) ? 1.5 : 0;
};

export const createPriorityArrayAndNumbersArray = (
  expression: string[]
): CreateTwoArrays => {
  const priorityArray = expression.reduce<BaseAndArrays>(
    ({ base, priorityOperatorsArray, numbersArray }, char, index, arr) => {
      if (char === "(")
        return { base: base + 2, priorityOperatorsArray, numbersArray };

      if (char === ")")
        return { base: base - 2, priorityOperatorsArray, numbersArray };

      if (isNumberLabel(char)) {
        return {
          base,
          priorityOperatorsArray,
          numbersArray: [...numbersArray, Number(char)],
        };
      }
      
      if (isOperatorLabel(char)) {
        const priority = operatorsPriorities[char];
        if (getExtraPriorityIfNeeded(arr, index)) {
          console.log(char, " ", getExtraPriorityIfNeeded(arr, index));
        }
        
        return {
          base,
          priorityOperatorsArray: [
            ...priorityOperatorsArray,
            base + priority + getExtraPriorityIfNeeded(arr, index),
          ],
          numbersArray,
        };
      }

      return { base, priorityOperatorsArray, numbersArray };
    },
    { base: 0, priorityOperatorsArray: [], numbersArray: [] }
  );

  return {
    priorityArray: priorityArray.priorityOperatorsArray,
    numbersArray: priorityArray.numbersArray,
  };
};

export const calcExpression = (expression: string): CalculateExpression => {
  const { canBeCalc, validExpression } = validateExpression(expression);
  if (!canBeCalc) {
    return {
      validExpression: validExpression.join(""),
      answer: null,
    };
  }

  return {
    validExpression: validExpression.join(""),
    answer: 1,
  };
};
