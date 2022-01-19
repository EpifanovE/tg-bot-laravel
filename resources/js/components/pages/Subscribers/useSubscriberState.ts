import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useApi} from "../../../hooks/useApi";
import {ISubscriber} from "./types";
import useIsMounted from "../../../hooks/useIsMounted";

const useSubscriberState = () => {

    const api = useApi();

    const {id} = useParams<{id: string}>();

    const {isMounted} = useIsMounted();

    const [subscriber, setSubscriber] = useState<ISubscriber>();
    const [saving, setSaving] = useState(false);
    const [blocking, setBlocking] = useState(false);

    useEffect(() => {
        fetchSubscriber();
    }, []);

    const fetchSubscriber = () => {
        if (!id) return;

        api
            .getOne<ISubscriber>(`subscribers`, id)
            .then(response => {
                if (!response?.data) return;

                if (isMounted) {
                    setSubscriber(response.data);
                }
            });
    }

    const handleSaveClick = () => {

        if (!id) return;

        setSaving(true);

        api
            .update<ISubscriber>(`subscribers`, {
                id,
                data: {
                    ...subscriber
                }
            })
            .then(response => {
                if (isMounted) {
                    if (response?.data) {
                        setSubscriber(response.data)
                    }
                }
            })
            .finally(() => {
                if (isMounted) {
                    setSaving(false);
                }
            });
    }

    const handleTextChange = () => {

    }

    const handleBlockClick = () => {
        setBlocking(true);
        api
            .request<{data: ISubscriber}>({
                method: "post",
                endpoint: `subscribers/${id}/block`
            })
            .then(response => {
                if (!response?.data?.data) return;

                if (isMounted) {
                    setSubscriber(response.data.data);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setBlocking(false);
                }
            })
    }

    const handleAdminChange = (value: Array<string | number>) => {

        if (!subscriber) return;

        setSubscriber({
            ...subscriber,
            admin_id: value[0] as number | undefined || null,
        })
    }

    return {
        subscriber,
        saving,
        blocking,
        handleSaveClick,
        handleTextChange,
        handleBlockClick,
        handleAdminChange
    }
};

export default useSubscriberState;
