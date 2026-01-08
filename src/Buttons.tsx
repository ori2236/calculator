import "./Buttons.css";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { Button } from "./Button";

export type ButtonsPropsType = {
    setExpression: Dispatch<SetStateAction<string>>;
    inputRef: RefObject<HTMLInputElement | null>;
    cursorPositionRef: RefObject<number | null>;
    expressionLength: number;
    answer: number | null;
};

export const labels = ["AC", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "delete", "="] as const;

export const Buttons = ({ setExpression, inputRef, cursorPositionRef, expressionLength, answer }: ButtonsPropsType) => {
    const buttons = labels.map((label) => {
        return (
            <div key={label}><Button
                setExpression={setExpression}
                inputRef={inputRef}
                cursorPositionRef={cursorPositionRef}
                expressionLength={expressionLength}
                answer={answer}
                label={label} /></div>
        )
    })

    return (
        <div className="grid-container">
            {buttons}
        </div>
    );
}