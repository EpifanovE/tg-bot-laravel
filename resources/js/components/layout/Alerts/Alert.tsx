import React, {FC} from "react";
import {IHasClassName} from "../../../types/app";
import {IAlert} from "./types";

interface IAlertProps extends IAlert, IHasClassName {
    onCloseClick: (id: string) => void
}

const Alert: FC<IAlertProps> = ({id, mode, message, onCloseClick}) => {

    const classes = `alert alert-${mode ? mode : "primary"} alert-dismissible fade show`;

    return <div className={classes}>
        <div dangerouslySetInnerHTML={{__html: message}} />
        <button type="button" className="close" onClick={() => onCloseClick(id)} >
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
};

export default Alert;
