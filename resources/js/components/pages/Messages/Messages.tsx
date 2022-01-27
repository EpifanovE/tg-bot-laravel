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
import {IMessageItem} from "./types";
import {statusMode, statusText} from "./utils";
import {NavLink} from "react-router-dom";

const Messages: FC = () => {
    const {t} = useTranslation();
    const {locale} = useSelector<IRootState, IAdminState>(state => state.admin);

    const {disallow, messageComponent} = useAccess(["messages.manage", "messages.view"]);

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
            render: (item: IMessageItem)=> <NavLink to={`/messages/${item.id}`}>{item.name}</NavLink>
        },
        {
            key: "status",
            label: t("status"),
            source: "status",
            sortable: true,
            render: (item: IMessageItem)=> {
                return <Badge mode={statusMode(item.status)}>{statusText(item.status)}</Badge>
            }
        },
        {
            key: "run",
            label: t("plannedAt"),
            source: "run_at",
            sortable: true,
            render: (item: IMessageItem) => {
                if (item.run_at) {
                    return moment(item.run_at).locale(locale).format('DD-MM-YY HH:mm');
                }

                return "-"
            }
        },
        {
            key: "created",
            label: t("createdAt"),
            source: "created_at",
            sortable: true,
            render: (item: IMessageItem) => moment(item.created_at).locale(locale).format('DD-MM-YY HH:mm')
        },
        {
            key: "updated",
            label: t("updatedAt"),
            source: "updated_at",
            sortable: true,
            render: (item: IMessageItem) => moment(item.updated_at).locale(locale).format('DD-MM-YY HH:mm')
        },
    ];

    const filters = [
        <TextFilter
            source="search"
            label={`${t("search")}...`}
            width={{lg: 6}}
        />,

        <SelectFilter
            source="status"
            choices={
                {
                    draft: t("statuses.draft"),
                    published: t("statuses.published"),
                    planned: t("statuses.planned"),
                }
            }
            width={{lg: 6}}
            canBeEmpty={true}
            emptyText={t("status")}
        />,
    ];

    return <IndexPage
        resource="messages"
        title={t("messagesLabel")}
        columns={columns}
        filters={filters}
        creating={true}
    />;
};

export default Messages;
