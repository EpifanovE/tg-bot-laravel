import React, {FC} from "react";
import {IHasClassName} from "../../../../types/app";

interface ICardBodyProps extends IHasClassName{

}

const CardBody: FC<ICardBodyProps> = ({children, className}) => {
    const classes = `card-body${className ? " " + className : ""}`;
    return <div className={classes}>{children}</div>
};

export default CardBody;
