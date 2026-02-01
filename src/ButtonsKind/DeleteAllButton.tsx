import { ButtonUI } from "../Button/ButtonUI";

export interface deleteAllButtonProps {
    handleExpressionChange: (onClick: () => string) => void;
}

export const DeleteAllButton = (props: deleteAllButtonProps) => {
    const { handleExpressionChange } = props;

    const getEmptyExpression = () => "";

    return <ButtonUI label={"AC"} onPress={() => handleExpressionChange(getEmptyExpression)} />;
}