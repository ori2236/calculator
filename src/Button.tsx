import "./Button.css"

type LabelType = {
    label: string;
};

const getIconClassIfNeeded: Record<string, string> = {
    delete: "delete fa-solid fa-delete-left",
    "*": "fa-solid fa-xmark",
};

export const Button = ({ label }: LabelType) => {
    const iconClass = getIconClassIfNeeded[label];
    return (
        <div className="label">
            {iconClass ? (<i className={`${label} ${iconClass}`} />) : (label)}
        </div>
    );
}