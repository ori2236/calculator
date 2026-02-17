import "./Button.css"
import type { Label } from "../Types/LabelTypes";
import type { JSX } from "react";

interface ButtonProps {
    label: Label;
    onPress: () => void;
    icon?: JSX.Element | null;
}

export const Button = ({ label, onPress, icon }: ButtonProps) => {
    const handleMovedFocus = (e: React.MouseEvent<HTMLButtonElement>) =>
        e.preventDefault();

    return (
        <button onMouseDown={handleMovedFocus} onClick={onPress}>
            {icon ?? label}
        </button>
    );
};
