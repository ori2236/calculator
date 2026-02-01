import "./ButtonsGrid.css";
import { gridLabels, specialNotes, type Label, type Note } from "../Types/LabelTypes";
import { calcExpression } from "../services/calcExpression";
import { DeleteAllButton } from "../ButtonsKind/DeleteAllButton";
import { DeleteButton } from "../ButtonsKind/DeleteButton";
import { EqualButton } from "../ButtonsKind/EqualButton";
import { NotesButton } from "../ButtonsKind/NotesButton";
import type { ButtonsGridProps } from "../Types/ClassTypes";

export const ButtonsGrid = (props: ButtonsGridProps) => {
    const { expression, setExpression, inputRef, cursorPositionRef, answer, setAnswer } = props;

    const isNote = (label: Label): label is Note =>
        !specialNotes.some((s) => s === label);

    const handleExpressionChange = (actionFunction: () => string) => {
        const newExpression = actionFunction();

        if (newExpression) {
            const { validExpression, answer } = calcExpression(newExpression);
            const deltaLengthExpressions =
                validExpression.length - newExpression.length;

            if (cursorPositionRef.current !== null) {
                cursorPositionRef.current += deltaLengthExpressions;
            }

            setExpression(validExpression);
            setAnswer(answer);
        } else {
            setExpression("");
            setAnswer(null);
        }
    };

    return (
        <div className="grid-container">
            {gridLabels.map((label) => {
                if (label === "AC")
                    return <DeleteAllButton
                        key={label}
                        handleExpressionChange={handleExpressionChange}
                    />;

                if (label === "delete")
                    return <DeleteButton
                        key={label}
                        handleExpressionChange={handleExpressionChange}
                        expression={expression}
                        inputRef={inputRef}
                        cursorPositionRef={cursorPositionRef}
                    />;

                if (label === "=")
                    return <EqualButton
                        key={label}
                        handleExpressionChange={handleExpressionChange}
                        answer={answer}
                    />;

                if (isNote(label))
                    return <NotesButton
                        key={label}
                        note={label}
                        handleExpressionChange={handleExpressionChange}
                        expression={expression}
                        inputRef={inputRef}
                        cursorPositionRef={cursorPositionRef}
                    />;
                return null;
            })}
        </div>
    );
}