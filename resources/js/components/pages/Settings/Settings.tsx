import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import moment from "moment";

import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import useAccess from "../../../hooks/useAccess";
import IndexPage from "../../layout/IndexPage";
import {ISettingItem} from "./types";

const Settings: FC = () => {
    const {t} = useTranslation();
    const {locale} = useSelector<IRootState, IAdminState>(state => state.admin);

    const {disallow, messageComponent} = useAccess(["settings.manage", "settings.view"]);

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
            render: (item: ISettingItem)=> {
                if (item.name) {
                    return <NavLink to={`/settings/${item.id}`}>{item.name}</NavLink>
                }

                return <span>{t("notDefined")}</span>
            }
        },
        {
            key: "code",
            label: t("code"),
            source: "code",
        },
        {
            key: "type",
            label: t("type"),
            source: "type",
            sortable: true,
            render: (item: ISettingItem)=> {
                return t(`settingsTypes.${item.type}`)
            }
        },
        {
            key: "created",
            label: t("createdAt"),
            source: "created_at",
            sortable: true,
            render: (item: ISettingItem) => moment(item.created_at).locale(locale).format('DD-MM-YY HH:mm')
        },
        {
            key: "updated",
            label: t("updatedAt"),
            source: "updated_at",
            sortable: true,
            render: (item: ISettingItem) => moment(item.updated_at).locale(locale).format('DD-MM-YY HH:mm')
        },
    ];

    const filters = [

    ];

    return <IndexPage
        resource="settings"
        title={t("settings")}
        columns={columns}
        filters={filters}
    />;
};

export default Settings;
