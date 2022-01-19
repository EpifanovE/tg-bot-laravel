import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useApi} from "../../../hooks/useApi";
import {IAdmin, IAdminItem} from "./types";
import {STATUS_ACTIVE} from "./helpers";
import useIsMounted from "../../../hooks/useIsMounted";

const useAdminState = () => {
    const api = useApi();

    const {id} = useParams<{id: string}>();

    const [admin, setAdmin] = useState<IAdmin>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        status: STATUS_ACTIVE,
        roles: []
    });

    const [saving, setSaving] = useState(false);
    const [createdAdminId, setCreatedAdminId] = useState<number>();

    const {isMounted} = useIsMounted();

    useEffect(() => {
        if (!id) return;

        api
            .getOne<IAdmin>(`admins`, id)
            .then(response => {
                if (!response?.data) return;

                if (isMounted) {
                    setAdmin(response.data);
                }
            })
    }, []);

    const handleSaveClick = () => {
        setSaving(true);
        if (id) {
            api
                .update<IAdmin>("admins", {
                    id,
                    data: {
                        ...admin,
                    }
                })
                .then(response => {
                    if (isMounted) {
                        setAdmin({
                            ...admin,
                            password: "",
                            password_confirmation: "",
                        });
                    }

                })
                .finally(() => {
                    if (isMounted) {
                        setSaving(false);
                    }
                });
        } else {
            api
                .create<IAdmin>("admins", {
                    data: admin
                })
                .then(response => {
                    if (isMounted) {
                        setCreatedAdminId(response?.data.id);
                    }
                })
                .finally(() => {
                    if (isMounted) {
                        setSaving(false);
                    }
                });
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {target: {name, value}} = e;

        setAdmin({
            ...admin,
            [name]: value
        })
    };

    const handleRolesChange = (value: Array<string | number>) => {
        setAdmin({
            ...admin,
            roles: value as Array<number>
        })
    };

    const handleStatusChange = (value: Array<string | number>) => {
        setAdmin({
            ...admin,
            status: value[0] as string
        });
    };

    return {
        admin,
        handleSaveClick,
        handleTextChange,
        handleRolesChange,
        handleStatusChange,
        saving,
        createdAdminId,
    }
};

export default useAdminState;
