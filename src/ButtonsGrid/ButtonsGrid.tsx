import "./ButtonsGrid.css";
import { gridLabels, isNoteLabel, isSpecialLabel, type Label, type SpecialLabel } from "../Types/LabelTypes";
import { calcExpression } from "../services/calcExpression";
import { DeleteAllButton } from "../ButtonsKind/DeleteAllButton";
import { DeleteButton } from "../ButtonsKind/DeleteButton";
import { EqualButton } from "../ButtonsKind/EqualButton";
import { NotesButton } from "../ButtonsKind/NotesButton";
import type { Dispatch, SetStateAction, RefObject, JSX } from "react";

export interface ButtonsGridProps {
    expression: string,
    setExpression: Dispatch<SetStateAction<string>>;
    inputRef: RefObject<HTMLInputElement | null>,
    cursorPositionRef: RefObject<number | null>,
    answer: number | null
    setAnswer: Dispatch<SetStateAction<number | null>>;
}

export const ButtonsGrid = (props: ButtonsGridProps) => {
    const { expression, setExpression, inputRef, cursorPositionRef, answer, setAnswer } = props;

    const setNewExpression = (newExpression: string) => {
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

    const specialLabelsButtons: Record<SpecialLabel, (label: SpecialLabel) => JSX.Element> = {
        AC: (label) => (
            <DeleteAllButton
                key={label}
                setNewExpression={setNewExpression}
            />
        ),
        delete: (label) => (
            <DeleteButton
                key={label}
                setNewExpression={setNewExpression}
                expression={expression}
                inputRef={inputRef}
                cursorPositionRef={cursorPositionRef}
            />
        ),
        "=": (label) => (
            <EqualButton
                key={label}
                setNewExpression={setNewExpression}
                answer={answer}
                expression={expression}
            />
        ),
    };

    const buttons = (label: Label) => {
        if (isSpecialLabel(label)) {
            return specialLabelsButtons[label](label);
        }

        if (isNoteLabel(label)) {
            return (
                <NotesButton
                    key={label}
                    note={label}
                    setNewExpression={setNewExpression}
                    expression={expression}
                    inputRef={inputRef}
                    cursorPositionRef={cursorPositionRef}
                />
            );
        }
        return null;
    };

    return <div className="grid-container">{gridLabels.map(buttons)}</div>;
}