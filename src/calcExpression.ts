export type IsValidType = {
  canBeCalc: boolean;
  validExpression: string;
};

export const validBrackets = (expression: string): boolean => {
  const expressionArray = [...expression];
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

export const validateExpression = (expression: string): IsValidType => {
  return { canBeCalc: false, validExpression: expression };
};

export const calcExpression = (expression: string): number | null => {
  return null;
};
