
import type { Dispatch, SetStateAction, RefObject } from "react";
import type { Note } from "../types";
import { ButtonUI } from "../Button/ButtonUI";

export interface NotesButtonProps {
    handleExpressionChange: (onClick: () => string) => void;
    note: Note
    expression: string,
    inputRef: RefObject<HTMLInputElement | null>,
    cursorPositionRef: RefObject<number | null>;
}

export const NotesButton = (props: NotesButtonProps) => {
    const { handleExpressionChange, note, expression, inputRef, cursorPositionRef } = props;

    const onInsert = () => {
        const inputObject = inputRef.current;
        const startCurserIndex = inputObject?.selectionStart ?? expression.length - 1;
        const endCurserIndex = inputObject?.selectionEnd ?? expression.length - 1;

        cursorPositionRef.current = startCurserIndex + note.length
        return expression.slice(0, startCurserIndex) + note + expression.slice(endCurserIndex);
    };

    return <ButtonUI label={note} onPress={() => handleExpressionChange(onInsert)} />;
}
