import React, {FC} from "react";
import {GridSize} from "../../../types/app";

export interface IColProps {
    width?: {[key in GridSize]?: number}
    className?: string
}

const Col: FC<IColProps> = ({width, children, className}) => {

    const widthClasses = width ? Object.keys(width).reduce((acc, currentKey) => {
        if (currentKey === "col") {
            return "";
        }

        return `${acc} col-${currentKey}-${width[currentKey]}`
    }, width["col"] ? width["col"] : "col-12") : "col-12";

    const classes = `${widthClasses}`;

    return <div className={`${classes}${className ? " " + className : ""}`}>
        {children}
    </div>
};

export default Col;
