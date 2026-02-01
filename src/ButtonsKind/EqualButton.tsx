import { ButtonUI } from "../Button/ButtonUI";

export interface EqualButtonProps {
    handleExpressionChange: (onClick: () => string) => void;
    answer: Number | null;
}

export const EqualButton = (props: EqualButtonProps) => {
    const { handleExpressionChange, answer } = props;

    const getAnswerAsString = () => answer ? answer.toString() : "";


    return <ButtonUI label={"="} onPress={() => handleExpressionChange(getAnswerAsString)} />;
}