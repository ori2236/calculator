import { ButtonUI } from "../Button/ButtonUI";
import type { EqualButtonProps } from "../Types/ClassTypes";

export const EqualButton = (props: EqualButtonProps) => {
    const { handleExpressionChange, answer } = props;

    const getAnswerAsString = () => answer ? answer.toString() : "";


    return <ButtonUI label={"="} onPress={() => handleExpressionChange(getAnswerAsString)} />;
}