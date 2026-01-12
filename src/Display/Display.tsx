import "./Display.css"
import { useLayoutEffect } from "react";
import { type DisplayProps } from "../types";

export function keepCaretVisible(input: HTMLInputElement, pos: number) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const style = getComputedStyle(input);

    if (!ctx) return;
    ctx.font = style.font;

    const margin = 18;

    const widthUntilTheCurser = ctx.measureText(input.value.slice(0, pos)).width;

    const rightEdge = input.scrollLeft + input.clientWidth - margin;
    const leftEdge = input.scrollLeft + margin;

    if (widthUntilTheCurser > rightEdge) {
        input.scrollLeft += widthUntilTheCurser - rightEdge;
    }

    if (widthUntilTheCurser < leftEdge) {
        input.scrollLeft -= leftEdge - widthUntilTheCurser;
    }
}

export const Display = ({ expression, inputRef, cursorPositionRef, answer }: DisplayProps) => {
    useLayoutEffect(() => {
        const inputObject = inputRef.current;
        const cursorPosition = cursorPositionRef.current;
        if (!inputObject || cursorPosition === null) return;

        inputObject.setSelectionRange(cursorPosition, cursorPosition);
        if (cursorPosition === inputObject.value.length) {
            inputObject.scrollLeft = inputObject.scrollWidth;
        } else {
            keepCaretVisible(inputObject, cursorPosition);
        }
    }, [expression, inputRef, cursorPositionRef]);


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = ['ArrowLeft', 'ArrowRight'];

        if (!allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <div className="display">
            <input
                ref={inputRef}
                value={expression}
                className="expressionLine"
                onKeyDown={handleKeyDown}
            />
            <p className="answerLine">{answer}</p>
        </div>
    )
}