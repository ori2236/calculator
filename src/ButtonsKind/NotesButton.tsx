
import type { RefObject } from "react";
import { ButtonUI } from "../Button/ButtonUI"
import { LiaTimesSolid } from "react-icons/lia";
import type { Note } from "../Types/LabelTypes";

interface NotesButtonProps {
    handleExpressionChange: (onClick: () => string) => void;
    note: Note;
    expression: string;
    inputRef: RefObject<HTMLInputElement | null>;
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

    const icon = note === "*" ? <LiaTimesSolid /> : null;
    return <ButtonUI
        label={note}
        onPress={() => handleExpressionChange(onInsert)}
        icon={icon}
    />;
}
