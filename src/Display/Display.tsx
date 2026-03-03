import "./Display.css"
import type { AnswerLine } from "../Types/CalculationTypes";
import { useLayoutEffect, type RefObject } from "react";
import { isValidationError, validationErrors, type ValidationError } from "../Types/ValidationErrorTypes";

export const keepCaretVisible = (input: HTMLInputElement, curserPosition: number) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const style = getComputedStyle(input);

    if (!ctx) return;
    ctx.font = style.font;

    const margin = 18;

    const widthUntilTheCurser = ctx.measureText(input.value.slice(0, curserPosition)).width;

    const rightEdge = input.scrollLeft + input.clientWidth - margin;
    const leftEdge = input.scrollLeft + margin;

    if (widthUntilTheCurser > rightEdge) {
        input.scrollLeft += widthUntilTheCurser - rightEdge;
    }

    if (widthUntilTheCurser < leftEdge) {
        input.scrollLeft -= leftEdge - widthUntilTheCurser;
    }
}

export interface DisplayProps {
    expression: string,
    inputRef: RefObject<HTMLInputElement | null>,
    cursorPositionRef: RefObject<number | null>,
    answerLine: AnswerLine
}

export const Display = (props: DisplayProps) => {
    const { expression, inputRef, cursorPositionRef, answerLine } = props;

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

    const answerToken = answerLine.toString();
    const errorKey: ValidationError | null = isValidationError(answerToken) ? answerToken : null;

    const shouldHideError = errorKey === "EmptyExpression" || errorKey === "OneNumberOnly";

    const answer = errorKey === null ? answerLine :
        shouldHideError ? "" : validationErrors[errorKey];

    const lineKind = errorKey && !shouldHideError ? "answerLine errorLine" : "answerLine resultLine";

    return (
        <div className="display">
            <input
                ref={inputRef}
                value={expression}
                className="expressionLine"
                onKeyDown={handleKeyDown}
            />
            <p className={lineKind}>{answer}</p>
        </div>
    )
}