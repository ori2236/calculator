import "./Button.css"
import { FiDelete } from "react-icons/fi";
import { type ButtonProps, type Label } from "../types";
import { LiaTimesSolid } from "react-icons/lia";
import type { JSX } from "react";
import { validateExpression } from "../services/validateExpression";
import { calcExpression } from "../services/calcExpression";

const getIconClassIfNeeded: Partial<Record<Label, JSX.Element>> = {
    "delete": <FiDelete />,
    "*": <LiaTimesSolid />,
};

export const Button = ({ expression, setExpression, inputRef, cursorPositionRef, expressionLength, answer, setAnswer, label }: ButtonProps) => {
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
            const { canBeCalc, validExpression } = validateExpression(newExpression);
            const deltaLengthExpressions =
                validExpression.join("").length - newExpression.length;

            if (cursorPositionRef.current !== null) {
                cursorPositionRef.current += deltaLengthExpressions;
            }

            setExpression(validExpression.join(""));
            setAnswer(canBeCalc ? calcExpression(validExpression) : null);
        } else {
            setExpression("");
            setAnswer(null);
        }
    };

    const handlePress = () => {
        const inputObject = inputRef.current;
        const startCurserIndex = inputObject?.selectionStart ?? expressionLength - 1;
        const endCurserIndex = inputObject?.selectionEnd ?? expressionLength - 1;

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