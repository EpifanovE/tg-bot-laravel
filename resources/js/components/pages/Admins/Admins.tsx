import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import moment from "moment";

import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import IndexPage from "../../layout/IndexPage";
import SelectFilter from "../../layout/DataGrid/filters/SelectFilter";
import Badge from "../../layout/Badge/Badge";
import TextFilter from "../../layout/DataGrid/filters/TextFilter";
import {IAdminItem} from "./types";
import {statusMode, statusText} from "./helpers";
import useAccess from "../../../hooks/useAccess";

interface IAdminsProps {

}

const Admins: FC<IAdminsProps> = () => {

    const {t} = useTranslation();
    const {locale} = useSelector<IRootState, IAdminState>(state => state.admin);

    const {disallow, messageComponent} = useAccess(["admins.manage", "admins.view"]);

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
            label: t("username"),
            source: "name",
            sortable: true,
            render: (item: IAdminItem)=> {
                if (item.name) {
                    return <NavLink to={`/admins/${item.id}`}>{item.name}</NavLink>
                }

                return <span>{t("notDefined")}</span>
            }
        },
        {
            key: "email",
            label: t("email"),
            source: "email",
        },
        {
            key: "status",
            label: t("status"),
            source: "status",
            sortable: true,
            render: (item: IAdminItem)=> {
                return <Badge mode={statusMode(item.status)}>{statusText(item.status)}</Badge>
            }
        },
        {
            key: "created",
            label: t("createdAt"),
            source: "created_at",
            sortable: true,
            render: (item: IAdminItem) => moment(item.created_at).locale(locale).format('DD-MM-YY HH:mm')
        },
        {
            key: "updated",
            label: t("updatedAt"),
            source: "updated_at",
            sortable: true,
            render: (item: IAdminItem) => moment(item.updated_at).locale(locale).format('DD-MM-YY HH:mm')
        },
    ];

    const filters = [
        <TextFilter source="search" label={`${t("search")}...`} width={{lg: 6}} />,
        <SelectFilter
            source="status"
            choices={
                {
                    active: statusText("active"),
                    disabled: statusText("disabled")
                }
            }
            width={{lg: 6}}
            canBeEmpty={true}
            emptyText={t("allStatuses")}
        />,
    ];

    return <IndexPage
        resource="admins"
        title={t("admins")}
        columns={columns}
        filters={filters}
        creating={true}
    />;
};

export default Admins;
