import type { Dispatch, RefObject, SetStateAction } from "react";
import { Button } from "./Button";
import "./Buttons.css";

export type ButtonsPropsType = {
    setExpression: Dispatch<SetStateAction<string>>;
    inputRef: RefObject<HTMLInputElement | null>;
    cursorPositionRef: RefObject<number>;
    expressionLength: number;
    answer: number | null;
    setAnswer: Dispatch<SetStateAction<number | null>>;
};

export const Buttons = ({ setExpression, inputRef, cursorPositionRef, expressionLength, answer, setAnswer }: ButtonsPropsType) => {
    const applyInsert = (text: string, startCurserIndex: number, endCurserIndex: number, isCurserAtTheEnd: boolean) => {
        setExpression((prev) => prev.slice(0, startCurserIndex) + text + prev.slice(endCurserIndex));
        cursorPositionRef.current = startCurserIndex + text.length
    };

    const applyDelete = (startCurserIndex: number, endCurserIndex: number, isCurserAtTheEnd: boolean) => {
        if (startCurserIndex !== endCurserIndex) {
            cursorPositionRef.current = startCurserIndex;
            setExpression((prev) => prev.slice(0, startCurserIndex) + prev.slice(endCurserIndex));
            return;
        }

        if (startCurserIndex === 0) return;

        cursorPositionRef.current = startCurserIndex - 1;
        setExpression((prev) => prev.slice(0, startCurserIndex - 1) + prev.slice(startCurserIndex));
    };

    const handlePress = (label: string) => {
        //all clear, delete all
        if (label === "AC") {
            setExpression("");
            return;
        }

        const inputObject = inputRef.current
        if (!inputObject) return;

        if (label === "=") {
            setExpression(String(answer))
            return;
        }

        //curser positions, if any is null set as expression length
        // ?? - nullish
        const startCurserIndex = inputObject.selectionStart ?? expressionLength;
        const endCurserIndex = inputObject.selectionEnd ?? expressionLength;

        const isCurserAtTheEnd = startCurserIndex === expressionLength && endCurserIndex === expressionLength;

        if (label === "delete") {
            applyDelete(startCurserIndex, endCurserIndex, isCurserAtTheEnd);
            return;
        }
        applyInsert(label, startCurserIndex, endCurserIndex, isCurserAtTheEnd);
    };

    const labels = ["AC", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "delete", "="];
    const buttons = labels.map((label) => {
        return (
            <div key={label}><Button label={label} onPress={handlePress} /></div>
        )
    })

    return (
        <div className="grid-container">
            {buttons}
        </div>
    );
}