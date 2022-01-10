import React, {FC} from "react";

interface ISpinnerProps {
    className?: string
    size?: string
}

const Spinner: FC<ISpinnerProps> = ({className, size}) => {

    const classes = `spinner-border${size ? " spinner-border-" + size : ""} ${className}`;

    return <span className={classes} />
};

export default Spinner;
