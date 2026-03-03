import type { RefObject } from "react";
import { Button } from "../Button/Button";
import type { AnswerLine } from "../Types/CalculationTypes";
import { isValidationError } from "../Types/ValidationErrorTypes";


interface EqualButtonProps {
  setNewExpression: (newExpression: string) => void;
  answerLine: AnswerLine;
  expression: string;
  cursorPositionRef: RefObject<number | null>;
}

export const EqualButton = (props: EqualButtonProps) => {
  const { setNewExpression, answerLine, expression, cursorPositionRef } = props;

  const handleExpressionChange = () => {
    const newExpression = isValidationError(answerLine.toString()) ? expression : answerLine.toString();
    setNewExpression(newExpression);
    cursorPositionRef.current = newExpression.length;
  }

  return <Button label={"="} onPress={handleExpressionChange} />;
}