import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useApi} from "../../../hooks/useApi";
import {IAdmin} from "./types";
import {STATUS_ACTIVE} from "./helpers";
import useIsMounted from "../../../hooks/useIsMounted";

const useAdminState = () => {
    const api = useApi();

    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    const [admin, setAdmin] = useState<IAdmin>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        status: STATUS_ACTIVE,
        roles: []
    });

    const [saving, setSaving] = useState(false);

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
    }, [id]);

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
                    if (isMounted && response?.data) {
                        setAdmin(response.data);
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
                    if (response?.data?.id) {
                        navigate(`/admins/${response.data.id}`);
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
    }
};

export default useAdminState;
