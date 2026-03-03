export const validBrackets = (expression: string): boolean => {
  const counter = [...expression].reduce((counter, note) => {
    if (counter < 0) return counter;

    if (note === "(") return counter + 1;
    else if (note === ")") {
      return counter - 1;
    }

    return counter;
  }, 0);

  return counter === 0;
};