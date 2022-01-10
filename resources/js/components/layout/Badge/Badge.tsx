import React, {FC} from "react";

export interface IBadgeProps {
    mode?: string
    className?: string
}

const Badge: FC<IBadgeProps> = ({children, mode, className}) => {
    const classes = `badge badge-${mode ? mode : "primary"}${className ? " " + className : ""}`;
    return <span className={classes}>{children}</span>
};

export default Badge;
