import React, {FC} from "react";
import {useSelector} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAppState} from "../../../store/reducers/appReducer";
import {useTranslation} from "react-i18next";
import {IBreadcrumb} from "../../../types/app";

interface IBreadcrumbsProps {
    breadcrumbs?: Array<IBreadcrumb>
}

const Breadcrumbs: FC<IBreadcrumbsProps> = ({breadcrumbs}) => {

    const {t} = useTranslation();
    const {id} = useParams();

    if (!breadcrumbs || breadcrumbs.length === 0) {
        return <></>
    }

    const breadcrumbsEls = breadcrumbs.map((item, index) => {
        return item.url
            ? <li className="breadcrumb-item" key={index}>
                <NavLink to={item.url}>{t(item.label)}</NavLink>
            </li>
            : <li className="breadcrumb-item" key={index}>{item.label === ":id" ? id : t(item.label)}</li>
    });


    return <div className="c-subheader px-3">
        <ol className="breadcrumb border-0 m-0">
            {breadcrumbsEls}
        </ol>
    </div>;
};

export default Breadcrumbs;
