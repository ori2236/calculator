import { Button } from "../Button/Button";

export interface deleteAllButtonProps {
    setNewExpression: (newExpression: string) => void;
}

export const DeleteAllButton = (props: deleteAllButtonProps) => {
    const { setNewExpression } = props;

    return <Button label={"AC"} onPress={() => setNewExpression("")} />;
}