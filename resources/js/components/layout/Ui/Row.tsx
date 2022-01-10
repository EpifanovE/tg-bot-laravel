import React, {FC} from "react";

interface IRowProps {
    className?: string
}

const Row: FC<IRowProps> = ({children, className}) => {
    const classes = `row${className ? " " + className : ""}`;
    return <div className={classes}>{children}</div>
};

export default Row;
