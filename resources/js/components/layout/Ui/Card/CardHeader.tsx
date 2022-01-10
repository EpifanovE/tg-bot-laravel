import React, {FC} from "react";
import {IHasClassName} from "../../../../types/app";

interface ICardHeaderProps extends IHasClassName {

}

const CardHeader: FC<ICardHeaderProps> = ({children, className}) => {
    const classes = `card-header${className ? " " + className : ""}`;
    return <div className={classes}>{children}</div>
};

export default CardHeader;
