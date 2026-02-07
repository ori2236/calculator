import { ButtonUI } from "../Button/ButtonUI";

export interface deleteAllButtonProps {
    handleExpressionChange: (onClick: () => string) => void;
}

const getEmptyExpression = () => "";

export const DeleteAllButton = (props: deleteAllButtonProps) => {
    const { handleExpressionChange } = props;

    return <ButtonUI label={"AC"} onPress={() => handleExpressionChange(getEmptyExpression)} />;
}