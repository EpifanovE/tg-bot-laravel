import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useApi} from "../../../hooks/useApi";
import {ISetting} from "./types";
import {PayloadType} from "../../layout/Payload/types";
import useIsMounted from "../../../hooks/useIsMounted";

const useSettingState = () => {

    const api = useApi();
    const {id} = useParams<{id: string}>();
    const [saving, setSaving] = useState(false);

    const [setting, setSetting] = useState<ISetting>({
        name: "",
        code: "",
        type: "text",
        payload: {value: ""}
    });

    const [createdSettingId, setCreatedSettingId] = useState<number>();

    const {isMounted} = useIsMounted();

    useEffect(() => {
        if (!id) return;

        api
            .getOne<ISetting>("settings", id)
            .then(response => {
                if (!isMounted) return;

                if (!response?.data) return;

                setSetting(response?.data)
            })
    }, []);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {target: {name, value}} = e;

        setSetting({
            ...setting,
            [name]: value
        })
    };

    const handleTypeChange = (value: Array<string | number>) => {
        setSetting({
            ...setting,
            type: value[0] as PayloadType
        })
    };

    const handlePayloadChange = (value: any) => {
        setSetting({
            ...setting,
            payload: {
                value: value
            }
        });
    };

    const handleSaveClick = () => {
        setSaving(true);

        if (id) {
            api
                .update<ISetting>("settings", {
                    id: id,
                    data: setting
                })
                .finally(() => {
                    if (!isMounted) return;

                    setSaving(false)
                })
        } else {
            api
                .create<ISetting>("settings", {
                    data: setting
                })
                .then(response => {
                    if (!isMounted) return;

                    setCreatedSettingId(response?.data.id)
                })
                .finally(() => {
                    if (!isMounted) return;

                    setSaving(false)
                })
        }
    };

    return {
        setting,
        createdSettingId,
        saving,
        handleTextChange,
        handleSaveClick,
        handleTypeChange,
        handlePayloadChange,
    }
};

export default useSettingState;
