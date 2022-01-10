import React from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAppState} from "../../../store/reducers/appReducer";
import {useTranslation} from "react-i18next";

const Breadcrumbs = () => {

    const {t} = useTranslation();

    const {breadcrumbs} = useSelector<IRootState, IAppState>(state => state.app);

    if (!breadcrumbs || breadcrumbs.length === 0) {
        return <></>
    }

    const breadcrumbsEls = breadcrumbs.map((item, index) => {
        return item.url
            ? <li className="breadcrumb-item" key={index}>
                <NavLink to={item.url}>{t(item.label)}</NavLink>
                {/*<a href={item.url}>{t(item.label)}</a>*/}
            </li>
            : <li className="breadcrumb-item" key={index}>{t(item.label)}</li>
    });


    return <div className="c-subheader px-3">
        <ol className="breadcrumb border-0 m-0">
            {breadcrumbsEls}
        </ol>
    </div>;
};

export default Breadcrumbs;
