export type IsValidExpressionType = {
  canBeCalc: boolean;
  validExpression: string[];
};

export const validBrackets = (expressionArray: string[]): boolean => {
  try {
    const counter = expressionArray.reduce((counter, char) => {
      if (char === "(") counter++;
      else if (char === ")") {
        counter--;
        if (counter < 0) throw new Error("invalid brackets");
      }
      return counter;
    }, 0);

    if (counter != 0) return false;
    return true;
  } catch (e) {
    return false;
  }
};

export const validNumbers = (expression: string): IsValidExpressionType => {
  return { canBeCalc: false, validExpression: [...expression] };
};

export const validateExpression = (expression: string): IsValidExpressionType => {
  return { canBeCalc: false, validExpression: [...expression] };
};

export const calcExpression = (expression: string): number | null => {
  return null;
};
