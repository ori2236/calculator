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

export const validateNumbers = (expression: string): IsValidExpressionType => {
  /*
  [] : only one char
  + : one or more notes
  0-9 : digits
  +,/,* : operators
  \- : since - is for range (like 0-9) we need '\' before the '-'
  (,) : brackets
  g : serch for all the matches (g for global)

  if no matches returns null so i added '?? []'
  */

  //spliting by -, +, *, /, ( ,) and keepng them in an array
  const splitExpression: string[] =
    expression.match(/[0-9.]+|[+\-*/()]/g) ?? [];

  //validate the all the numbers
  const validExpression = splitExpression.map((char, index, arr) => {
    /*
    ^ : from the begginig of the string
    $ : to the ending of the string
    */
    //if not a number continue
    if (!/^[0-9.]+$/.test(char)) return char;

    //if a number start with decimal point add zero fefore
    if (char.startsWith(".")) char = "0" + char;

    //delete all the decimal point except the first one
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

    //0 one or more and then digits at the begginig of the number before decimal point, the digits is just for checking
    return char.replace(/^0+(?=[0-9])/, "");
  });

  //cheking every item in the array that if he numeric and end with '.' (for example 5.)
  //if there is one, the function could not be calculate
  const canBeCalc = validExpression.every((char) => {
    return !(/^[0-9.]+$/.test(char) && /\.$/.test(char));
  });

  //if the expression is empty or contain only one char can not calculate
  return {
    canBeCalc: canBeCalc && validExpression.length > 1,
    validExpression,
  };
};

export const validateExpression = (
  expression: string
): IsValidExpressionType => {
  const expressionArray = [...expression];
  //remove all the invalid chars
  const validCharsExpression = expressionArray.filter((char) =>
    /[0-9.+\-*/()]/.test(char)
  );

  //validate the numbers and join the digits togther
  const {
    canBeCalc: allNumbersAreValids,
    validExpression: validNumbersExpression,
  } = validateNumbers(validCharsExpression.join(""));

  //if the brackets isn't valid return that can't be calculate
  if (!validBrackets(validCharsExpression))
    return { canBeCalc: false, validExpression: validCharsExpression };

  const str = validNumbersExpression.join("");
  const invalidChecks = () =>
    //the expression contain invalid number
    !allNumbersAreValids ||
    //the expression contain brackets after operator
    /[+\-*/]\)/.test(str) ||
    //the expression contain empty brackets
    /\(\)/.test(str);

  if (invalidChecks())
    return { canBeCalc: false, validExpression: validNumbersExpression };

  const operatorPattern = /[+\-*/]/;
  const exceptionPattern = /[*/]/;
  const operatorWithoutMinusPattern = /[+*/]/;
  const numbersAndOpenBracketPattern = /\)|[0-9.]+/;
  const numbersAndcloseBracketPattern = /\(|[0-9.]+/;

  const deleteAdjacentOperators = validNumbersExpression.flatMap(
    (char, index, arr) => {
      if (index === arr.length - 1) return [char];
      const nextChar = arr[index + 1];
      //any two adjust operators is invalid except where it's /- or *-
      const isTwoAdjustOperator =
        operatorPattern.test(char) && operatorPattern.test(nextChar);
      const isException = exceptionPattern.test(char) && nextChar === "-";
      return isTwoAdjustOperator && !isException ? [] : [char];
    }
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

      //delete the operator that adjust to the opening bracket if exist
      if (isOpeningBracketAdjustToOperator) return [];

      //checking if a multiplication operator needs to be added
      const isMultipicationOperatorNeeded =
        numbersAndOpenBracketPattern.test(previousChar) &&
        numbersAndcloseBracketPattern.test(char);

      //adding '*' before the char
      return isMultipicationOperatorNeeded ? ["*", char] : [char];
    }
  );

  return {
    canBeCalc: true,
    validExpression,
  };
};
