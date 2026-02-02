import "./Button.css"
import type { IconLabel, Label } from "../Types/LabelTypes";
import { FiDelete } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import type { JSX } from "react";
import type { ButtonCover, ButtonUIProps } from "../Types/ClassTypes";

const icon: Record<IconLabel, JSX.Element> = {
    "delete": <FiDelete />,
    "*": <LiaTimesSolid />,
};

const isIconLabel = (label: Label): label is IconLabel =>
    label in icon;

const getButtonCover = (label: Label): ButtonCover =>
    isIconLabel(label) ? icon[label] : label;

export const ButtonUI = ({ label, onPress }: ButtonUIProps) => {
    const handleMovedFocus = (e: React.MouseEvent<HTMLButtonElement>) =>
        e.preventDefault();

    return (
        <button onMouseDown={handleMovedFocus} onClick={onPress}>
            {getButtonCover(label)}
        </button>
    );
};
