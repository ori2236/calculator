import { FiDelete } from "react-icons/fi";
import { ButtonUI } from "../Button/ButtonUI";
import type { RefObject } from "react";

interface deleteButtonProps {
    handleExpressionChange: (onClick: () => string) => void;
  expression: string;
  inputRef: RefObject<HTMLInputElement | null>;
  cursorPositionRef: RefObject<number | null>;
}

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

    return <ButtonUI label={"delete"} onPress={() => handleExpressionChange(onDelete)} icon={<FiDelete />}/>;
}
