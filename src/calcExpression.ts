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
  /*
  spliting by -, +, *, /, ( ,) and keepng them in the array
  [] : only one char
  + : one or more notes
  0-9 : digits
  +,/,* : operators
  \- : since - is for range (like 0-9) we need '\' before the '-'
  (,) : brackets
  g : serch for all the matches (g for global)

  if no matches returns null so i added '?? []'
  */
  const splitExpression = expression.match(/[0-9.]+|[+\-*/()]/g) ?? [];
  const validExpression = splitExpression.map((char, index) => {
    /*
    ^ : from the begginig of the string
    $ : to the ending of the string
    [] : only one char
    0-9 : digits
    +,/,* : operators
    \- : since - is for range (like 0-9) we need '\' before the '-'
    (,) : brackets
    + : one or more notes
    */
    if (!/^[0-9.]+$/.test(char)) return char;
    if (char.startsWith(".")) char = "0" + char;
    const firstDecimalPointIndex = char.indexOf(".");
    if (firstDecimalPointIndex !== -1) {
      const before = char.slice(0, firstDecimalPointIndex + 1);
      const after = char.slice(firstDecimalPointIndex + 1).replaceAll(".", "");
      char = before + after;
    }
    char = char.replace(/^0+(?=\d)/, "");
    return char;
  });

  //cheking every item in the array that if he numeric and end with '.' (for example 5.)
  //if there is one, the function could not be calculate
  const canBeCalc = validExpression.every((char) => {
    return !(/^[0-9.]+$/.test(char) && /\.$/.test(char));
  });
  return { canBeCalc, validExpression };
};

export const validateExpression = (
  expression: string
): IsValidExpressionType => {
  return { canBeCalc: false, validExpression: [...expression] };
};

export const calcExpression = (expression: string): number | null => {
  return null;
};
