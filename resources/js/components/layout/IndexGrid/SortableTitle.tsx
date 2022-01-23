import React, {FC} from "react";
import {ISortableTitleProps} from "./types";
import {SORT_ASC} from "./constants";

const SortableTitle : FC<ISortableTitleProps> = ({label, active, direction, onClick, source}) => {

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClick(source);
    };

    return <span className="d-flex align-items-center">
        {
            label &&
            <a href="#" onClick={handleClick} className="text-dark mr-1">
                <span>{label}</span>
            </a>
        }
        {
            active &&
            <i className={`c-icon c-icon-sm ml-2 ${(direction === SORT_ASC) ? " cil-sort-ascending" : " cil-sort-descending"}`}/>
        }
    </span>
};

export default SortableTitle;
