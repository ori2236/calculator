import "./Button.css"
import type { Label } from "../types";
import { FiDelete } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import type { JSX } from "react";

type IconLabel = "delete" | "*";
const iconClass: Record<IconLabel, JSX.Element> = {
    "delete": <FiDelete />,
    "*": <LiaTimesSolid />,
};

const isIconLabel = (label: Label): label is IconLabel =>
    label in iconClass;

type ButtonCover = JSX.Element | Exclude<Label, IconLabel>;
const getButtonCover = (label: Label): ButtonCover =>
    isIconLabel(label) ? iconClass[label] : label;

export interface ButtonUIProps {
    label: Label;
    onPress: () => void;
}

export const ButtonUI = ({ label, onPress }: ButtonUIProps) => {
    const handleMovedFocus = (e: React.MouseEvent<HTMLButtonElement>) =>
        e.preventDefault();

    return (
        <button onMouseDown={handleMovedFocus} onClick={onPress}>
            {getButtonCover(label)}
        </button>
    );
};
