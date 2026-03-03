import { FiDelete } from "react-icons/fi";
import { Button } from "../Button/Button";
import type { RefObject } from "react";

interface deleteButtonProps {
    setNewExpression: (newExpression: string) => void;
    expression: string;
    inputRef: RefObject<HTMLInputElement | null>;
    cursorPositionRef: RefObject<number | null>;
}

export const DeleteButton = (props: deleteButtonProps) => {
    const { setNewExpression, expression, inputRef, cursorPositionRef } = props;

    const deletionInExpression = () => {
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

    const handleExpressionChange = () => {
        const newExpression = deletionInExpression();
        setNewExpression(newExpression);
    }

    return <Button label={"delete"} onPress={handleExpressionChange} icon={<FiDelete />} />;
}
