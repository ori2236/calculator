import "./Button.css"
import { isNumberLabel, type Label } from "../Types/LabelTypes";
import type { JSX } from "react";

interface ButtonProps {
    label: Label;
    onPress: () => void;
    icon?: JSX.Element | null;
}

export const Button = ({ label, onPress, icon }: ButtonProps) => {
    const handleMovedFocus = (e: React.MouseEvent<HTMLButtonElement>) =>
        e.preventDefault();

    const buttonKind = isNumberLabel(label) ? "regularButton" : "specialButton";
    const buttonStyle = `${buttonKind} ${label}`;

    return (
        <button onMouseDown={handleMovedFocus} onClick={onPress} className={`${buttonStyle} ${label}`} data-label={label}>
            {icon ?? label}
        </button>
    );
};
