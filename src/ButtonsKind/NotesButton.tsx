
import { ButtonUI } from "../Button/ButtonUI"
import type { NotesButtonProps } from "../Types/ClassTypes";

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
