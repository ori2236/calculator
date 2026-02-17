import { Button } from "../Button/Button";

interface EqualButtonProps {
  setNewExpression: (newExpression: string) => void;
  answer: number | null;
}

export const EqualButton = (props: EqualButtonProps) => {
  const { setNewExpression, answer } = props;

  const getAnswerAsString = answer ? answer.toString() : "";

  return <Button label={"="} onPress={() => setNewExpression(getAnswerAsString)} />;
}