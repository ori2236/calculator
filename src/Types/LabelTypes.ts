const digits = [
  "0", "1", "2", "3", "4", "5", "6","7", "8", "9", "."
] as const;
type Digit = (typeof digits)[number];

const brackets = ["(", ")"] as const;
export type Bracket = (typeof brackets)[number];

const operators = ["+", "-", "*", "/"] as const;
export type Operator = (typeof operators)[number];

const specialNotes = ["AC", "delete", "="] as const;
export type SpecialNotes = (typeof specialNotes)[number];

const labels = [...digits, ...brackets, ...operators, ...specialNotes] as const;
export type Label = (typeof labels)[number];

export type Note = Exclude<Label, SpecialNotes>;

export const gridLabels: Label[] = [
  "AC", "(", ")", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "delete", "=",
];

export type IconLabel = "delete" | "*";

export const isDigitLabel = (note: string): note is Digit => {
  const numbersPattern = /^[0-9.]+$/;
  return numbersPattern.test(note);
};

export const isOperatorLabel = (note: string): note is Operator => {
  return (operators as readonly string[]).includes(note);
};

export const isBracketsLabel = (note: string): note is Bracket => {
  return (brackets as readonly string[]).includes(note);
};

export const isSpecialNoteLabel = (note: string): note is SpecialNotes => {
  return (specialNotes as readonly string[]).includes(note);
};

export const isNoteLabel = (note: string): note is Note => {
  return (
    (labels as readonly string[]).includes(note) &&
    !(specialNotes as readonly string[]).includes(note)
  );
};