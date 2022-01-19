import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import moment from "moment";

import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import IndexPage from "../../layout/IndexPage";
import {IRoleItem} from "./types";
import useAccess from "../../../hooks/useAccess";

interface IRolesProps {

}

const Roles: FC<IRolesProps> = () => {
    const {t} = useTranslation();
    const {locale} = useSelector<IRootState, IAdminState>(state => state.admin);

    const {disallow, messageComponent} = useAccess(["roles.manage", "roles.view"]);

    if (disallow) {
        return messageComponent;
    }

    const columns = [
        {
            key: "id",
            label: "ID",
            source: "id",
            sortable: true
        },
        {
            key: "name",
            label: t("name"),
            source: "name",
            sortable: true,
            render: (item: IRoleItem)=> {
                if (item.name) {
                    return <NavLink to={`/roles/${item.id}`}>{item.name}</NavLink>
                }

                return <span>{t("notDefined")}</span>
            }
        },
        {
            key: "key",
            label: t("key"),
            source: "key",
        },
        {
            key: "created",
            label: t("createdAt"),
            source: "created_at",
            sortable: true,
            render: (item: IRoleItem) => moment(item.created_at).locale(locale).format('DD-MM-YY HH:mm')
        },
        {
            key: "updated",
            label: t("updatedAt"),
            source: "updated_at",
            sortable: true,
            render: (item: IRoleItem) => moment(item.updated_at).locale(locale).format('DD-MM-YY HH:mm')
        },
    ];

    const filters = [

    ];

    return <IndexPage
        resource="roles"
        title={t("roles")}
        columns={columns}
        filters={filters}
        creating={true}
    />;
};

export default Roles;
