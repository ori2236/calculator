import type {
  Arrays,
  CalculateExpression,
  Label,
  Operator,
  OperatorAndPriority,
  PrecedenceAndArrays,
  StopSignalAndArrays,
} from "../Types/LabelTypes";
import { validateExpression } from "./validateExpression";

const isNumberLabel = (char: string): char is Label => {
  const numbersPattern = /[0-9.]+/;
  return numbersPattern.test(char);
};

const isOperatorLabel = (char: string): char is Operator => {
  const operatorPattern = /[+\-*/]/;
  return operatorPattern.test(char);
};

const operatorsPriorities: Record<Operator, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

const getExtraPriorityIfNeeded = (arr: string[], currentIndex: number) => {
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
  operatorsArray: OperatorAndPriority[],
  numbersArray: number[],
) => {
  const lastOperator = operatorsArray[operatorsArray.length - 1];
  const numbersArrayLength = numbersArray.length;

  const isUnaryMinus =
    lastOperator.operator === "-" && lastOperator.priority % 1 !== 0;

  const secondNum = numbersArray[numbersArrayLength - 1];
  if (lastOperator.operator === "/" && secondNum === 0)
    throw new Error("division by 0");

  const firstNum = isUnaryMinus ? 0 : numbersArray[numbersArrayLength - 2];

  const result = applyOperatorFactory(firstNum, secondNum)[
    lastOperator.operator
  ];

  const newNumbersArray = [
    ...numbersArray.slice(0, isUnaryMinus ? -1 : -2),
    result,
  ];
  const newOperatorsArray = operatorsArray.slice(0, -1);

  return { operatorsArray: newOperatorsArray, numbersArray: newNumbersArray };
};

const calcIfNeeded = (
  operatorsArray: OperatorAndPriority[],
  numbersArray: number[],
  currentPriority: number,
): Arrays => {
  const calcedArrays = operatorsArray.reduceRight<StopSignalAndArrays>(
    ({ operatorsArray, numbersArray, stopped }) => {
      if (stopped || operatorsArray.length === 0)
        return { operatorsArray, numbersArray, stopped };

      const topOperator = operatorsArray[operatorsArray.length - 1];

      if (currentPriority > topOperator.priority)
        return { operatorsArray, numbersArray, stopped: true };

      const arrays = applyTopOperator(operatorsArray, numbersArray);
      return { ...arrays, stopped: false };
    },
    { operatorsArray, numbersArray, stopped: false },
  );

  return {
    operatorsArray: calcedArrays.operatorsArray,
    numbersArray: calcedArrays.numbersArray,
  };
};

export const calcExpression = (expression: string): CalculateExpression => {
  const { canBeCalc, validExpression: validExpressionArray } =
    validateExpression(expression);
  const validExpression = validExpressionArray.join("");
  if (!canBeCalc) return { validExpression: validExpression, answer: null };

  try {
    const calcedExpression = validExpressionArray.reduce<PrecedenceAndArrays>(
      ({ operatorsArray, numbersArray, base }, char, index, arr) => {
        if (char === "(")
          return { operatorsArray, numbersArray, base: base + 2 };

        if (char === ")")
          return { operatorsArray, numbersArray, base: base - 2 };

        if (isNumberLabel(char)) {
          return {
            operatorsArray,
            numbersArray: [...numbersArray, Number(char)],
            base,
          };
        }

        if (isOperatorLabel(char)) {
          const priority =
            base +
            operatorsPriorities[char] +
            getExtraPriorityIfNeeded(arr, index);
          const calcedArrays = calcIfNeeded(
            operatorsArray,
            numbersArray,
            priority,
          );

          return {
            operatorsArray: [
              ...calcedArrays.operatorsArray,
              { operator: char, priority },
            ],
            numbersArray: calcedArrays.numbersArray,
            base,
          };
        }

        return { operatorsArray, numbersArray, base };
      },
      { operatorsArray: [], numbersArray: [], base: 0 },
    );

    const finalCalc = calcIfNeeded(
      calcedExpression.operatorsArray,
      calcedExpression.numbersArray,
      0,
    );
    const answer = finalCalc.numbersArray[0];

    return { validExpression: validExpression, answer };
  } catch {
    return { validExpression: validExpression, answer: null };
  }
};
