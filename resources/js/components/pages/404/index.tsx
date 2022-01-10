import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Page404: FC = () => {

    const {t} = useTranslation();

    return <div className="container d-flex flex-column justify-content-center">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">{t("header404")}</h4>
                <p className="text-muted mb-4">{t("text404")}</p>
                <NavLink to={`/`} className="btn btn-primary ml-auto" >На главную</NavLink>
            </div>
        </div>
    </div>
};

export default Page404;
