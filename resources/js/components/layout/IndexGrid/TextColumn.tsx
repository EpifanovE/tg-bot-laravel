import React, {FC} from "react";
import {ITextColumnProps} from "./types";

const TextColumn : FC<ITextColumnProps> = ({value}) => {
    return <td className="align-middle">{value}</td>
};

export default TextColumn;
