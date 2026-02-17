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
  return previousNote === "*" || previousNote === "/" ? 1.5 : 0;
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
) => {
  const lastOperator = operatorsStack[operatorsStack.length - 1];

  const isUnaryMinus =
    lastOperator.note === "-" && lastOperator.priority % 1 !== 0;

  const secondNum = numbersStack[numbersStack.length - 1];
  if (lastOperator.note === "/" && secondNum === 0)
    throw new Error("division by 0");
  const firstNum = isUnaryMinus ? 0 : numbersStack[numbersStack.length - 2];
  
  const result = applyOperatorFactory(firstNum, secondNum)[lastOperator.note];

  const newNumbersStack = [
    ...numbersStack.slice(0, isUnaryMinus ? -1 : -2),
    result,
  ];
  const newoperatorsStack = operatorsStack.slice(0, -1);

  return { operatorsStack: newoperatorsStack, numbersStack: newNumbersStack };
};

const calculateOperators = (
  operatorsStack: Operator[],
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

        return {
          ...state,
          operatorsStack: [
            ...newStacks.operatorsStack,
            { note: note, priority },
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
  const { canBeCalculated, validExpression: validExpressionArray } =
    validateExpression(expression);
  const validExpression = validExpressionArray.join("");
  if (!canBeCalculated) return { validExpression, answer: null };

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
