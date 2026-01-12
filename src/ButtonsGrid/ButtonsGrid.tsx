import "./ButtonsGrid.css";
import { Button } from "../Button/Button";
import { labels, type ButtonsGridProps } from "../types";

export const ButtonsGrid = ({ expression, setExpression, inputRef, cursorPositionRef, answer, setAnswer }: ButtonsGridProps) => {
    return <div className="grid-container">{labels.map((label) => (
        <Button
            key={label}
            expression={expression}
            setExpression={setExpression}
            inputRef={inputRef}
            cursorPositionRef={cursorPositionRef}
            answer={answer}
            setAnswer={setAnswer}
            label={label}
        />
    ))}</div>;
}