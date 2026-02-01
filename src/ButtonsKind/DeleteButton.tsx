import { ButtonUI } from "../Button/ButtonUI";
import type { deleteButtonProps } from "../Types/ClassTypes";

export const DeleteButton = (props: deleteButtonProps) => {
    const { handleExpressionChange, expression, inputRef, cursorPositionRef } = props;

    const onDelete = () => {
        const inputObject = inputRef.current;
        const startCurserIndex = inputObject?.selectionStart ?? expression.length - 1;
        const endCurserIndex = inputObject?.selectionEnd ?? expression.length - 1;

        if (startCurserIndex === 0) return expression;

        if (startCurserIndex !== endCurserIndex) {
            cursorPositionRef.current = startCurserIndex;
            return expression.slice(0, startCurserIndex) + expression.slice(endCurserIndex);
        }

        cursorPositionRef.current = startCurserIndex - 1;
        return expression.slice(0, startCurserIndex - 1) + expression.slice(startCurserIndex)
    };


    return <ButtonUI label={"delete"} onPress={() => handleExpressionChange(onDelete)} />;
}
