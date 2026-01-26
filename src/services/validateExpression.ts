import type { ValidExpression } from "../types";

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

export const validateNumbers = (expression: string): ValidExpression => {
  const splitExpression: string[] = expression.match(/[0-9.]+|[+\-*/()]/g) ?? [];
  const validExpression = splitExpression.map((char, index, arr) => {
    if (!/^[0-9.]+$/.test(char)) return char;
    if (char.startsWith(".")) char = "0" + char;

    const firstDecimalPointIndex = char.indexOf(".");
    if (firstDecimalPointIndex !== -1) {
      const before = char.slice(0, firstDecimalPointIndex + 1);
      const after = char.slice(firstDecimalPointIndex + 1).replaceAll(".", "");
      char = before + after;
    }

    //if the number have decimal point and ends eith 0's
    //and there is operator or brackets after the number
    const nextChar = arr[index + 1];
    if (/(\.\d*?)0+$/.test(char) && /[+\-*/()]/.test(nextChar)) {
      //0 one or more and then digits at the end of the number after decimal point
      char = char.replace(/0+$/, "");
      //if the number is ending with decimal points delete it
      char = char.replace(/\.$/, "");
    }

    return char.replace(/^0+(?=[0-9])/, "");
  });

  const canBeCalc = validExpression.every((char) => {
    return !(/^[0-9.]+$/.test(char) && /\.$/.test(char));
  });

  return {
    canBeCalc: canBeCalc && validExpression.length > 1,
    validExpression,
  };
};

export const validateExpression = (expression: string): ValidExpression => {
  const expressionArray = [...expression];
  const validCharsExpression = expressionArray.filter((char) =>
    /[0-9.+\-*/()]/.test(char),
  );

  const { canBeCalc: allNumbersAreValids, validExpression: validNumbersExpression} = validateNumbers(validCharsExpression.join(""));

  if (!validBrackets(validCharsExpression))
    return { canBeCalc: false, validExpression: validCharsExpression };

  const firstNonBadStart = validNumbersExpression.findIndex(
    (t) => !/[+*/]/.test(t),
  );

  const validStartAndNumbersExpression = firstNonBadStart === -1
    ? [] : validNumbersExpression.slice(firstNonBadStart);

  const str = validStartAndNumbersExpression.join("");
  const invalidChecks = () =>
    //empty expression
    !validStartAndNumbersExpression.length ||
    //the expression contain invalid number
    !allNumbersAreValids ||
    //the expression contain closing bracket after operator
    /[+\-*/]\)/.test(str) ||
    //the expression contain empty brackets
    /\(\)/.test(str) ||
    //the expression contaion only a number
    /^-?[0-9]+(\.[0-9]+)?$/.test(str);

  if (invalidChecks())
    return { canBeCalc: false, validExpression: validStartAndNumbersExpression};

  const operatorPattern = /[+\-*/]/;
  const exceptionPattern = /[*/]/;
  const operatorWithoutMinusPattern = /[+*/]/;
  const numbersAndOpenBracketPattern = /\)|[0-9.]+/;
  const numbersAndCloseBracketPattern = /\(|[0-9.]+/;

  const deleteAdjacentOperators = validStartAndNumbersExpression.flatMap(
    (char, index, arr) => {
      if (index === arr.length - 1) return [char];
      const nextChar = arr[index + 1];
      const isTwoAdjustOperator =
        operatorPattern.test(char) && operatorPattern.test(nextChar);
      const isException = exceptionPattern.test(char) && nextChar === "-";
      return isTwoAdjustOperator && !isException ? [] : [char];
    },
  );

  //the expression ends with operator
  if (/[+\-*/]$/.test(deleteAdjacentOperators.join("")))
    return { canBeCalc: false, validExpression: deleteAdjacentOperators };

  /*
  delete the operator that adjust to the opening bracket if exist and
  checking if a multiplication operator needs to be added

  if the first previous char is '(' so for sure multiplication operator is no needed
  */
  const validExpression = deleteAdjacentOperators.flatMap(
    (char, index, arr) => {
      if (index === 0) return [char];
      const previousChar = arr[index - 1];

      const isOpeningBracketAdjustToOperator =
        previousChar === "(" && operatorWithoutMinusPattern.test(char);

      if (isOpeningBracketAdjustToOperator) return [];

      const isMultipicationOperatorNeeded =
        numbersAndOpenBracketPattern.test(previousChar) &&
        numbersAndCloseBracketPattern.test(char);

      return isMultipicationOperatorNeeded ? ["*", char] : [char];
    },
  );

  return {canBeCalc: true, validExpression};
};