import { Button } from "../Button/Button";

interface EqualButtonProps {
  setNewExpression: (newExpression: string) => void;
  answer: number | null;
  expression: string;
}

export const EqualButton = (props: EqualButtonProps) => {
  const { setNewExpression, answer, expression } = props;

  const newExpression = answer ? answer.toString() : expression;

  return <Button label={"="} onPress={() => setNewExpression(newExpression)} />;
}