import "./Button.css"

type ButtonPropsType = {
    onPress: (label: string) => void;
    label: string;
};

const getIconClassIfNeeded: Record<string, string> = {
    delete: "delete fa-solid fa-delete-left",
    "*": "fa-solid fa-xmark",
};

export const Button = ({ label, onPress }: ButtonPropsType) => {
    const iconClass = getIconClassIfNeeded[label];

    return (
        <button
            type="button"
            //when the user clicked the focus move to the button, this line prevents it
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onPress(label)}
        >
            {iconClass ? (<i className={`${label}Class ${iconClass}`} />) : (label)}
        </button>
    );
}