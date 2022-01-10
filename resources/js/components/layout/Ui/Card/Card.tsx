import React, {FC} from "react";
import {IHasClassName} from "../../../../types/app";

interface ICardProps extends IHasClassName{
    style?: {[key: string] : string}
}

const Card: FC<ICardProps> = ({children, className, style}) => {
    const classes = `card${className ? " " + className : ""}`;
    return <div className={classes} style={style}>{children}</div>
};

export default Card;
