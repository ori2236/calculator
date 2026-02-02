import type {
  OperatorObject,
  Stacks,
  StopState,
  CalculateExpression,
  StacksState,
} from "../Types/CalculationTypes";
import {
  isBracketsLabel,
  isDigitLabel,
  isOperatorLabel,
  type Bracket,
  type Operator,
} from "../Types/LabelTypes";
import { validateExpression } from "./validateExpression";

const operatorsPriorities: Record<Operator, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

const getExtraPriority = (arr: string[], currentIndex: number) => {
  if (currentIndex === 0) return 1.5;
  return /[/*]/.test(arr[currentIndex - 1]) ? 1.5 : 0;
};

const applyOperatorFactory = (
  firstNum: number,
  secondNum: number,
): Record<Operator, number> => ({
  "+": firstNum + secondNum,
  "-": firstNum - secondNum,
  "*": firstNum * secondNum,
  "/": firstNum / secondNum,
});

const applyTopOperator = (
  operatorsStack: OperatorObject[],
  numbersStack: number[],
) => {
  const lastOperator = operatorsStack[operatorsStack.length - 1];
  const numbersStackLength = numbersStack.length;

  const isUnaryMinus =
    lastOperator.operatorNote === "-" && lastOperator.priority % 1 !== 0;

  const secondNum = numbersStack[numbersStackLength - 1];
  if (lastOperator.operatorNote === "/" && secondNum === 0)
    throw new Error("division by 0");

  const firstNum = isUnaryMinus ? 0 : numbersStack[numbersStackLength - 2];

  const result = applyOperatorFactory(firstNum, secondNum)[
    lastOperator.operatorNote
  ];

  const newnumbersStack = [
    ...numbersStack.slice(0, isUnaryMinus ? -1 : -2),
    result,
  ];
  const newoperatorsStack = operatorsStack.slice(0, -1);

  return { operatorsStack: newoperatorsStack, numbersStack: newnumbersStack };
};

const calculateOperators = (
  operatorsStack: OperatorObject[],
  numbersStack: number[],
  currentPriority: number,
): Stacks => {
  const calcedArrays = operatorsStack.reduceRight<StopState>(
    (state) => {
      if (state.stopped || state.operatorsStack.length === 0) return state;

      const topOperator = state.operatorsStack[state.operatorsStack.length - 1];

      if (currentPriority > topOperator.priority) {
        return { ...state, stopped: true };
      }
      
      const arrays = applyTopOperator(state.operatorsStack, state.numbersStack);
      return { ...arrays, stopped: false };
    },
    { operatorsStack, numbersStack, stopped: false },
  );

  return {
    operatorsStack: calcedArrays.operatorsStack,
    numbersStack: calcedArrays.numbersStack,
  };
};

const bracketCase: Record<Bracket, (s: StacksState) => StacksState> = {
  "(": (s) => ({
    operatorsStack: s.operatorsStack,
    numbersStack: s.numbersStack,
    depthBonus: s.depthBonus + 2,
  }),
  ")": (s) => ({
    operatorsStack: s.operatorsStack,
    numbersStack: s.numbersStack,
    depthBonus: s.depthBonus - 2,
  }),
};

const calculateResult = (validExpressionArray: string[]) => {
  return validExpressionArray.reduce<StacksState>(
    (state, note, index, arr) => {
      if (isBracketsLabel(note)) return bracketCase[note](state);

      if (isDigitLabel(note)) {
        return {
          ...state,
          numbersStack: [...state.numbersStack, Number(note)],
        };
      }

      if (isOperatorLabel(note)) {
        const priority =
          state.depthBonus +
          operatorsPriorities[note] +
          getExtraPriority(arr, index);

        const newStacks = calculateOperators(
          state.operatorsStack,
          state.numbersStack,
          priority,
        );

        return {
          ...state,
          operatorsStack: [
            ...newStacks.operatorsStack,
            { operatorNote: note, priority },
          ],
          numbersStack: newStacks.numbersStack,
        };
      }

      return state;
    },
    { operatorsStack: [], numbersStack: [], depthBonus: 0 },
  );
};

export const calcExpression = (expression: string): CalculateExpression => {
  const { canBeCalculate, validExpressionAsArray: validExpressionArray } =
    validateExpression(expression);
  const validExpression = validExpressionArray.join("");
  if (!canBeCalculate) return { validExpression, answer: null };

  try {
    const calcedExpression = calculateResult(validExpressionArray);
    const finalCalc = calculateOperators(
      calcedExpression.operatorsStack,
      calcedExpression.numbersStack,
      0,
    );
    const answer = finalCalc.numbersStack[0];

    return { validExpression, answer };
  } catch {
    return { validExpression, answer: null };
  }
};
