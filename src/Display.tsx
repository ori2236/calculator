import "./Display.css"
import { useLayoutEffect, useState, type Dispatch, type RefObject, type SetStateAction } from "react";

export type DisplayProps = {
    expression: string;
    setExpression: Dispatch<SetStateAction<string>>;
    inputRef: RefObject<HTMLInputElement | null>;
    cursorPositionRef: RefObject<number>;
    answer: number | null;
};

function keepCaretVisible(input: HTMLInputElement, pos: number) {
    //creating element that doesn't appears on the screen
    const canvas = document.createElement("canvas");
    //with the context we can measure text
    const ctx = canvas.getContext("2d");
    //the function return the real css that the browser used
    const style = getComputedStyle(input);

    //for accurate reasult we setting the font of the context
    if (!ctx) return;
    ctx.font = style.font;
    
    //amount of pixels between the curser to the right edge
    const margin = 18;

    //calculate the width of the expression until the curser
    const widthUntilTheCurser = ctx.measureText(input.value.slice(0, pos)).width;

    //scrollWidth - the width of the input content the user can see
    const rightEdge = input.scrollLeft + input.clientWidth - margin;
    const leftEdge = input.scrollLeft + margin;

    //out of frame
    if (widthUntilTheCurser > rightEdge) {
        input.scrollLeft += widthUntilTheCurser - rightEdge;
    }

    if (widthUntilTheCurser < leftEdge) {
        input.scrollLeft -= leftEdge - widthUntilTheCurser;
    }
}

export const Display = ({ expression, setExpression, inputRef, cursorPositionRef, answer }: DisplayProps) => {
    //we are using useLayoutEffect because we want the curser will be set after
    //the DOM is rendering and before the browser paints the screen
    useLayoutEffect(() => {
        const inputObject = inputRef.current;
        const cursorPosition = cursorPositionRef.current;
        if (!inputObject) return;

        //set the curser to pos (selection between cursorPosition and cursorPosition)
        inputObject.setSelectionRange(cursorPosition, cursorPosition);
        if (cursorPosition === inputObject.value.length) {
            //scrollLeft - amount of pixels scrolled to the left
            //scrollWidth - total width of the entire input content
            inputObject.scrollLeft = inputObject.scrollWidth;
        } else {
            keepCaretVisible(inputObject, cursorPosition);
        }
    }, [expression, inputRef, cursorPositionRef]);


    return (
        <div>
            <input
                ref={inputRef}
                className="expressionLine"
                value={expression}
                //e-event, target- the input, what cause to the event, value- the value of the target
                onChange={(e) => setExpression(e.target.value)} />
            <p className="answerLine">{answer}</p>
        </div>
    )
}
