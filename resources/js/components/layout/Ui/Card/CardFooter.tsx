import React, {FC} from "react";
import {IHasClassName} from "../../../../types/app";

interface ICardFooterProps extends IHasClassName {

}

const CardFooter: FC<ICardFooterProps> = ({children, className}) => {
    const classes = `card-footer${className ? " " + className : ""}`;
    return <div className={classes}>{children}</div>
};

export default CardFooter;
