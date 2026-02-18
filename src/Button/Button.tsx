import "./Button.css"
import { isBracketsLabel, isNumberLabel, isOperatorLabel, isSpecialLabel, type Label } from "../Types/LabelTypes";
import type { JSX } from "react";

interface ButtonProps {
    label: Label;
    onPress: () => void;
    icon?: JSX.Element | null;
}

export const Button = ({ label, onPress, icon }: ButtonProps) => {
    const handleMovedFocus = (e: React.MouseEvent<HTMLButtonElement>) =>
        e.preventDefault();

    const buttonStyle = isNumberLabel(label) ? "reglarButton" : "specialButton";
    return (
        <button onMouseDown={handleMovedFocus} onClick={onPress} className={`${buttonStyle} ${label}`} data-label={label}>
            {icon ?? label}
        </button>
    );
};
