import React, {FC} from "react";
import Spinner from "../Ui/Spinner";
import {IDeleteActionProps} from "./types";
import {DELETE_ACTION} from "./constants";
import {useTranslation} from "react-i18next";

const DeleteAction : FC<IDeleteActionProps> = ({id, onClick, isDeleting, size}) => {

    const {t} = useTranslation();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        onClick(id, DELETE_ACTION)
    };

    return <button className={`btn${size ? " btn-" + size : ""} btn-outline-danger mr-1 Button ActionButton`} onClick={handleClick} type="button">
        {
            isDeleting
            ? <Spinner size="sm" className="Button__Spinner ActionButton__Icon"/>
            : <i className="c-icon cil-trash c-icon-sm ActionButton__Icon" />
        }
    </button>
};

export default DeleteAction;
