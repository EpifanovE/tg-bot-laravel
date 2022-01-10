import React, {FC} from "react";

interface IChoiceProps {
    value: string
    label: string
    onClick: (key: string) => void
    selected: boolean
}

const Choice: FC<IChoiceProps> = ({value, label, onClick, selected}) => {

    const handleClick = () => {
        onClick(value);
    };

    const classes = `CustomSelect__Choice${selected ? ' CustomSelect__Choice_selected' : ""}`;

    return <div
        className={classes}
        onClick={handleClick}
    >
        {label}
    </div>
};

export default Choice;
