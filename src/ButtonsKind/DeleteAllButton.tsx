import { ButtonUI } from "../Button/ButtonUI";
import type { deleteAllButtonProps } from "../Types/ClassTypes";

export const DeleteAllButton = (props: deleteAllButtonProps) => {
    const { handleExpressionChange } = props;

    const getEmptyExpression = () => "";

    return <ButtonUI label={"AC"} onPress={() => handleExpressionChange(getEmptyExpression)} />;
}