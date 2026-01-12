import "./Button.css"
import { FiDelete } from "react-icons/fi";
import { type ButtonProps, type Label } from "../types";
import { LiaTimesSolid } from "react-icons/lia";
import type { JSX } from "react";
import { calcExpression } from "../services/calcExpression";

const getIconClassIfNeeded: Partial<Record<Label, JSX.Element>> = {
    "delete": <FiDelete />,
    "*": <LiaTimesSolid />,
};

export const Button = ({ expression, setExpression, inputRef, cursorPositionRef, answer, setAnswer, label }: ButtonProps) => {
    const applyInsert = (text: Label, startCurserIndex: number, endCurserIndex: number) => {
        cursorPositionRef.current = startCurserIndex + text.length
        return expression.slice(0, startCurserIndex) + text + expression.slice(endCurserIndex);
    };

    const applyDelete = (startCurserIndex: number, endCurserIndex: number) => {
        if (startCurserIndex !== endCurserIndex) {
            cursorPositionRef.current = startCurserIndex;
            return expression.slice(0, startCurserIndex) + expression.slice(endCurserIndex);
        }

        if (startCurserIndex === 0) return expression;

        cursorPositionRef.current = startCurserIndex - 1;
        return expression.slice(0, startCurserIndex - 1) + expression.slice(startCurserIndex)
    };

    const specialButtonsFactory = (startCurserIndex: number, endCurserIndex: number): Partial<Record<Label, () => string>> => ({
        "AC": () => { return "" },
        "=": () => { return answer ? answer.toString() : "" },
        "delete": () => { return applyDelete(startCurserIndex, endCurserIndex) },
    })

    const handleExpressionChange = (newExpression: string) => {
        if (newExpression) {
            const { validExpression, answer } = calcExpression(newExpression);
            const deltaLengthExpressions =
                validExpression.length - newExpression.length;

            if (cursorPositionRef.current !== null) {
                cursorPositionRef.current += deltaLengthExpressions;
            }

            setExpression(validExpression);
            setAnswer(answer);
        } else {
            setExpression("");
            setAnswer(null);
        }
    };

    const handlePress = () => {
        const inputObject = inputRef.current;
        const startCurserIndex = inputObject?.selectionStart ?? expression.length - 1;
        const endCurserIndex = inputObject?.selectionEnd ?? expression.length - 1;

        const specialButtonsFunc = specialButtonsFactory(startCurserIndex, endCurserIndex)[label];
        const nextExpression = specialButtonsFunc ? specialButtonsFunc() : applyInsert(label, startCurserIndex, endCurserIndex);;
        handleExpressionChange(nextExpression)
    };

    const handleMovedFocus = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

    const iconClass = getIconClassIfNeeded[label];

    return (
        <button
            onMouseDown={handleMovedFocus}
            onClick={handlePress}
        >
            {iconClass ?? label}
        </button>
    );
}