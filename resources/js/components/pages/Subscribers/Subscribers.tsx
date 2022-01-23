import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import useAccess from "../../../hooks/useAccess";
import Badge from "../../layout/Badge/Badge";
import moment from "moment";
import TextFilter from "../../layout/IndexGrid/filters/TextFilter";
import SelectFilter from "../../layout/IndexGrid/filters/SelectFilter";
import IndexPage from "../../layout/IndexPage";
import {ISubscribersItem} from "./types";

const Subscribers: FC = () => {
    const {t} = useTranslation();
    const {locale} = useSelector<IRootState, IAdminState>(state => state.admin);

    const {disallow, messageComponent} = useAccess(["subscribers.manage", "subscribers.view"]);

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
            key: "first_name",
            label: t("first_name"),
            source: "first_name",
            sortable: true,
        },
        {
            key: "last_name",
            label: t("last_name"),
            source: "last_name",
            sortable: true,
        },
        {
            key: "username",
            label: t("username"),
            source: "username",
            sortable: true,
        },
        {
            key: "tid",
            label: t("tid"),
            source: "tid",
        },
        {
            key: "language_code",
            label: t("language"),
            source: "language_code",
            sortable: true,
        },
        {
            key: "blocked",
            label: t("blocked"),
            source: "blocked",
            sortable: true,
            render: (item: ISubscribersItem)=> {
                return <Badge mode={item.blocked ? "danger" : "success"}>{item.blocked ? t("yes") : t("no")}</Badge>
            }
        },
        {
            key: "created",
            label: t("createdAt"),
            source: "created_at",
            sortable: true,
            render: (item: ISubscribersItem) => moment(item.created_at).locale(locale).format('DD-MM-YY HH:mm')
        },
        {
            key: "updated",
            label: t("updatedAt"),
            source: "updated_at",
            sortable: true,
            render: (item: ISubscribersItem) => moment(item.updated_at).locale(locale).format('DD-MM-YY HH:mm')
        },
    ];

    const filters = [
        <TextFilter
            source="search"
            label={`${t("search")}...`}
            width={{lg: 6}}
        />,

        <SelectFilter
            source="blocked"
            choices={
                {
                    yes: t("yes"),
                    no: t("no")
                }
            }
            width={{lg: 6}}
            canBeEmpty={true}
            emptyText={t("blocked")}
        />,
    ];

    return <IndexPage
        resource="subscribers"
        title={t("subscribers")}
        columns={columns}
        filters={filters}
    />;
}

export default Subscribers;
