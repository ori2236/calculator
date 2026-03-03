
import type { RefObject } from "react";
import { Button } from "../Button/Button"
import { LiaTimesSolid } from "react-icons/lia";
import type { Note } from "../Types/LabelTypes";

interface NotesButtonProps {
    setNewExpression: (newExpression: string) => void;
    note: Note;
    expression: string;
    inputRef: RefObject<HTMLInputElement | null>;
    cursorPositionRef: RefObject<number | null>;
}

export const NotesButton = (props: NotesButtonProps) => {
    const { setNewExpression, note, expression, inputRef, cursorPositionRef } = props;

    const handleExpressionChange = () => {
        const inputObject = inputRef.current;
        const startCurserIndex = inputObject?.selectionStart ?? expression.length - 1;
        const endCurserIndex = inputObject?.selectionEnd ?? expression.length - 1;

        cursorPositionRef.current = startCurserIndex + note.length
        const newExpression = expression.slice(0, startCurserIndex) + note + expression.slice(endCurserIndex);
        setNewExpression(newExpression);
    };

    const icon = note === "*" ? <LiaTimesSolid /> : null;
    return <Button
        label={note}
        onPress={handleExpressionChange}
        icon={icon}
    />;
}
