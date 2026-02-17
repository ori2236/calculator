const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
type DigitChar = (typeof digits)[number];

const numberChars = [...digits, ".", "e"] as const;
type NumberChar = (typeof numberChars)[number];

const brackets = ["(", ")"] as const;
export type Bracket = (typeof brackets)[number];

const operators = ["+", "-", "*", "/"] as const;
export type OperatorNote = (typeof operators)[number];

const specialLabels = ["AC", "delete", "="] as const;
export type SpecialLabel = (typeof specialLabels)[number];

const notes = [...numberChars, ...brackets, ...operators] as const;
export type Note = (typeof notes)[number];

export type Label = Note | SpecialLabel;

export const gridLabels: Label[] = [
  "AC",
  "(",
  ")",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "delete",
  "=",
];

export function isDigitChar(char: string): char is DigitChar {
  return digits.some((digit) => digit === char);
}

export function isNumberChar(char: string): char is NumberChar {
  return numberChars.some((number) => number === char);
}

const isNumberLabelNoE = (tokens: string) => {
  return tokens.length > 0 && [...tokens].every((char) => isNumberChar(char));
};

export const isOperatorLabel = (token: string): token is OperatorNote => {
  return operators.some((op) => op === token);
};

export const isBracketsLabel = (token: string): token is Bracket => {
  return brackets.some((b) => b === token);
};

export const isSpecialLabel = (token: string): token is SpecialLabel => {
  return specialLabels.some((s) => s === token);
};

export const isNoteLabel = (token: string): token is Note => {
  return notes.some((note) => note === token);
};

const isIntegerLabel = (token: string) =>
  token.length > 0 && [...token].every(isDigitChar);

const validE = (token: string) => {
  if (!token.includes("e")) return false;

  const parts = token.split("e");
  if (parts.length !== 2) return false;

  const [beforeE, afterE] = parts;
  if (!isNumberLabelNoE(beforeE)) return false;
  if (afterE.length === 0) return false;

  const firstCharAfetrE = afterE[0];
  const hasSign =
    isOperatorLabel(firstCharAfetrE) &&
    (firstCharAfetrE === "+" || firstCharAfetrE === "-");
  const exponent = hasSign ? afterE.slice(1) : afterE;

  return isIntegerLabel(exponent);
};

export const isNumberLabel = (token: string) =>
  isNumberLabelNoE(token) || validE(token);
