import type {
  Operator,
  Stacks,
  StopState,
  CalculateExpression,
  StacksState,
} from "../Types/CalculationTypes";
import {
  isBracketsLabel,
  isNumberLabel,
  isOperatorLabel,
  type Bracket,
  type OperatorNote,
} from "../Types/LabelTypes";
import { validateExpression } from "./validateExpression";

const operatorsPriorities: Record<OperatorNote, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

const getExtraPriority = (array: string[], currentIndex: number) => {
  if (currentIndex === 0) return 1.5;
  const previousNote = array[currentIndex - 1];
  return previousNote === "*" || previousNote === "/" || previousNote === "("
    ? 1.5
    : 0;
};

const applyOperatorFactory = (
  firstNum: number,
  secondNum: number,
): Record<OperatorNote, number> => ({
  "+": firstNum + secondNum,
  "-": firstNum - secondNum,
  "*": firstNum * secondNum,
  "/": firstNum / secondNum,
});

const applyTopOperator = (
  operatorsStack: Operator[],
  numbersStack: number[],
): Stacks => {
  const lastOperator = operatorsStack[operatorsStack.length - 1];

  const isUnaryMinus =
    lastOperator.note === "-" && lastOperator.priority % 1 !== 0;

  const secondNum = numbersStack[numbersStack.length - 1];
  if (lastOperator.note === "/" && secondNum === 0)
    return {
      operatorsStack: [],
      numbersStack: [],
      validationError: "Can't divide by 0",
    };
  const firstNum = isUnaryMinus ? 0 : numbersStack[numbersStack.length - 2];

  const result = applyOperatorFactory(firstNum, secondNum)[lastOperator.note];

  const newNumbersStack = [
    ...numbersStack.slice(0, isUnaryMinus ? -1 : -2),
    result,
  ];
  const newoperatorsStack = operatorsStack.slice(0, -1);

  return {
    operatorsStack: newoperatorsStack,
    numbersStack: newNumbersStack,
    validationError: null,
  };
};

const calculateOperators = (
  operatorsStack: Operator[],
  numbersStack: number[],
  currentPriority: number,
): Stacks => {
  const calcedArrays = operatorsStack.reduceRight<StopState>(
    (state) => {
      if (state.stopped || state.operatorsStack.length === 0 || state.validationError) return state;

      const topOperator = state.operatorsStack[state.operatorsStack.length - 1];

      if (currentPriority > topOperator.priority) return { ...state, stopped: true };

      const arrays = applyTopOperator(state.operatorsStack, state.numbersStack);
      return { ...arrays, stopped: !!arrays.validationError };
    },
    { operatorsStack, numbersStack, validationError: null, stopped: false },
  );

  return {
    operatorsStack: calcedArrays.operatorsStack,
    numbersStack: calcedArrays.numbersStack,
    validationError: calcedArrays.validationError,
  };
};

const bracketCase: Record<Bracket, (state: StacksState) => StacksState> = {
  "(": (state) => ({ ...state, depthBonus: state.depthBonus + 2 }),
  ")": (state) => ({ ...state, depthBonus: state.depthBonus - 2 }),
};

const calculateResult = (validExpressionArray: string[]) => {
  return validExpressionArray.reduce<StacksState>(
    (state, note, index, array) => {
      if (isBracketsLabel(note)) return bracketCase[note](state);

      if (isNumberLabel(note)) {
        return {
          ...state,
          numbersStack: [...state.numbersStack, Number(note)],
        };
      }

      if (isOperatorLabel(note)) {
        const priority =
          state.depthBonus +
          operatorsPriorities[note] +
          getExtraPriority(array, index);

        const newStacks = calculateOperators(
          state.operatorsStack,
          state.numbersStack,
          priority,
        );

        if (newStacks.validationError) {
          return {
            ...state,
            ...newStacks,
            validationError: newStacks.validationError,
          };
        }

        return {
          ...state,
          operatorsStack: [...newStacks.operatorsStack, { note, priority }],
          numbersStack: newStacks.numbersStack,
        };
      }

      return state;
    },
    {
      operatorsStack: [],
      numbersStack: [],
      depthBonus: 0,
      validationError: null,
    },
  );
};

export const calcExpression = (expression: string): CalculateExpression => {
  if (!expression) return { validExpression: "", answer: "Empty expression" };

  const { validationError, validExpression: validExpressionArray } =
    validateExpression(expression);
  const validExpression = validExpressionArray.join("");

  if (validationError) return { validExpression, answer: validationError };

  const calcedExpression = calculateResult(validExpressionArray);

  if (calcedExpression.validationError) {
    return { validExpression, answer: calcedExpression.validationError };
  }

  const finalCalc = calculateOperators(
    calcedExpression.operatorsStack,
    calcedExpression.numbersStack,
    0,
  );

  if (finalCalc.validationError) {
    return { validExpression, answer: finalCalc.validationError };
  }
  const answer = finalCalc.numbersStack[0];

  return { validExpression, answer };
};