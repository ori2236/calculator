import "./Button.css"
import type { Label } from "../Types/LabelTypes";
import type { JSX } from "react";

interface ButtonUIProps {
    label: Label;
    onPress: () => void;
    icon?: JSX.Element | null;
}

export const ButtonUI = ({ label, onPress, icon }: ButtonUIProps) => {
    const handleMovedFocus = (e: React.MouseEvent<HTMLButtonElement>) =>
        e.preventDefault();

    return (
        <button onMouseDown={handleMovedFocus} onClick={onPress}>
            {icon ?? label}
        </button>
    );
};
