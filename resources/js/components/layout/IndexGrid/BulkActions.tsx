import React, {FC, useEffect, useState} from "react";
import SelectInput from "../../inputs/SelectInput";
import {IBulkActionsProps} from "./types";
import {useTranslation} from "react-i18next";

export const BULK_DELETE_ACTION = "delete";

const BulkActions: FC<IBulkActionsProps> = ({onSelect, actions}) => {

    const {t} = useTranslation();

    const [action, setAction] = useState<string>("");

    useEffect(() => {
        onSelect(action);
    }, [action]);

    const handleChange = (value: Array<string>) => {
        setAction(value[0]);
    };

    return <SelectInput
        onChange={handleChange}
        value={[action]}
        choices={actions || {}}
        canBeEmpty={true}
        emptyText={t("chooseAction")}
    />
};

export default BulkActions;

