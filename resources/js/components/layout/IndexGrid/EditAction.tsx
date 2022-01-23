import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import {IEditActionProps} from "./types";
import {useTranslation} from "react-i18next";

const EditAction : FC<IEditActionProps> = ({id, resource, size}) => {

    const {t} = useTranslation();

    return <NavLink className={`btn${size ? " btn-" + size : ""} btn-outline-primary mr-1 Button ActionButton`} to={`${id}`}>
        <i className="c-icon cil-pencil c-icon-sm ActionButton__Icon" />
    </NavLink>
};

export default EditAction;
