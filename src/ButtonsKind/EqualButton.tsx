import { Button } from "../Button/Button";
import type { AnswerLine } from "../Types/CalculationTypes";
import { isValidationError, isNumberLabel } from "../Types/LabelTypes";

interface EqualButtonProps {
  setNewExpression: (newExpression: string) => void;
  answerLine: AnswerLine;
  expression: string;
}

export const EqualButton = (props: EqualButtonProps) => {
  const { setNewExpression, answerLine, expression } = props;

  const handleExpressionChange = () => {
    const newExpression = isValidationError(answerLine.toString()) ? expression : answerLine.toString();
    setNewExpression(newExpression);
  }

  return <Button label={"="} onPress={handleExpressionChange} />;
}