import "./Button.css"
import type { ButtonsPropsType, labels } from "./Buttons";

type ButtonPropsType = ButtonsPropsType & {
    label: (typeof labels)[number];
};

export type labelType = (typeof labels)[number];

const getIconClassIfNeeded: Partial<Record<labelType, string>> = {
    delete: "delete fa-solid fa-delete-left",
    "*": "fa-solid fa-xmark",
};
export const Button = ({ setExpression, inputRef, cursorPositionRef, expressionLength, answer, label }: ButtonPropsType) => {
    const applyInsert = (text: string, startCurserIndex: number, endCurserIndex: number) => {
        setExpression((prev) => prev.slice(0, startCurserIndex) + text + prev.slice(endCurserIndex));
        cursorPositionRef.current = startCurserIndex + text.length
    };

    const applyDelete = (startCurserIndex: number, endCurserIndex: number) => {
        if (startCurserIndex !== endCurserIndex) {
            cursorPositionRef.current = startCurserIndex;
            setExpression((prev) => prev.slice(0, startCurserIndex) + prev.slice(endCurserIndex));
            return;
        }

        if (startCurserIndex === 0) return;

        cursorPositionRef.current = startCurserIndex - 1;
        setExpression((prev) => prev.slice(0, startCurserIndex - 1) + prev.slice(startCurserIndex));
    };

    const handlePress = () => {
        //all clear, delete all
        if (label === "AC") {
            setExpression("");
            return;
        }

        const inputObject = inputRef.current
        if (!inputObject) return;

        if (label === "=") {
            setExpression(String(answer))
            return;
        }

        //curser positions, if any is null set as expression length
        // ?? - nullish
        const startCurserIndex = inputObject.selectionStart ?? expressionLength;
        const endCurserIndex = inputObject.selectionEnd ?? expressionLength;

        if (label === "delete") {
            applyDelete(startCurserIndex, endCurserIndex);
            return;
        }
        applyInsert(label, startCurserIndex, endCurserIndex);
    };

    const iconClass = getIconClassIfNeeded[label];

    return (
        <button
            type="button"
            //when the user clicked the focus move to the button, this line prevents it
            onMouseDown={(e) => e.preventDefault()}
            onClick={handlePress}
        >
            {iconClass ? (<i className={`${label}Class ${iconClass}`} />) : (label)}
        </button>
    );
}