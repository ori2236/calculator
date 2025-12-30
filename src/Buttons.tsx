import { Button } from "./Button";
import "./Buttons.css";

export const Buttons = () => {
    const labels = ["AC", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "delete", "="];

    const buttons = labels.map((label) => {
        return (
            <div className="grid-item"><Button label={label} /></div>
        )
    })

    return (
        <div className="grid-container">
            {buttons}
        </div>
    );
}
