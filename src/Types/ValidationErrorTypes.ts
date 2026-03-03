export const validationErrors = {
  EmptyExpression: "Empty expression",
  DivisionByZero: "Can't divide by 0",
  InvalidBrackets: "Invalid brackets",
  OneNumberOnly: "One number only",
  OperatorInEdges: "Operator in edges",
  InvalidAdjustmentToClosingBracket: "Invalid adjustment to closing bracket",
  NumberEndesWithDecimalPoint: "A number endes with decimal point",
} as const;

export type ValidationError = keyof typeof validationErrors;

export const isValidationError = (token: string): token is ValidationError => {
  return token in validationErrors;
};
