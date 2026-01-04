export type IsValidType = {
  canBeCalc: boolean;
  validExpression: string;
};

export const validBrackets = (expression: string): boolean => {
  return false;
};

export const validateExpression = (expression: string): IsValidType => {
  return { canBeCalc: false, validExpression: expression };
};

export const calcExpression = (expression: string): number | null => {
  return null;
};
