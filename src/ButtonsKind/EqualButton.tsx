import { ButtonUI } from "../Button/ButtonUI";

interface EqualButtonProps {
    handleExpressionChange: (onClick: () => string) => void;
  answer: number | null;
}

export const EqualButton = (props: EqualButtonProps) => {
    const { handleExpressionChange, answer } = props;

    const getAnswerAsString = () => answer ? answer.toString() : "";


    return <ButtonUI label={"="} onPress={() => handleExpressionChange(getAnswerAsString)} />;
}