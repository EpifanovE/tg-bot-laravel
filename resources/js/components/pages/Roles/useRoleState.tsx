import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useApi} from "../../../hooks/useApi";
import {IPermission, IPermissionsList, IRole} from "./types";
import useIsMounted from "../../../hooks/useIsMounted";

const useRoleState = () => {
    const api = useApi();
    const {id} = useParams<{id: string}>();
    const [saving, setSaving] = useState(false);
    const [createdRoleId, setCreatedRoleId] = useState<number>();
    const [permissionsList, setPermissionsList] = useState<IPermissionsList>({
        groups: [],
        items: []
    });

    const [role, setRole] = useState<IRole>({
        name: "",
        key: "",
        permissions: [],
    });

    const {isMounted} = useIsMounted();

    useEffect(() => {
        if (!id) return;

        api
            .getOne<IRole>(`roles`, id)
            .then(response => {
                if (!response?.data) return;
                if (isMounted) {
                    setRole(response.data)
                }
            })
    }, []);

    useEffect(() => {
        api
            .request<Array<IPermission>>({
                method: "get",
                endpoint: `permissions`
            })
            .then(response => {
                if (isMounted) {
                    setPermissionsList(preparePermissions(response.data));
                }
            })
    }, []);

    const preparePermissions = (permissions: Array<IPermission>) : IPermissionsList => {
        let list: IPermissionsList = {
            groups: [],
            items: []
        };

        permissions.forEach(permission => {
            if (!!permission.group) {
                const existsGroup = list.groups.filter(group => group.title === permission.group)[0];
                if (existsGroup) {
                    list.groups.filter(group => group.title === permission.group)[0]?.items.push(permission)
                } else {
                    list.groups.push({
                        title: permission.group,
                        items: [permission]
                    })
                }
            } else {
                list.items.push(permission);
            }
        });

        return list;
    };

    const handleSaveClick = () => {
        setSaving(true);
        if (id) {
            api
                .update<IRole>("roles", {
                    id,
                    data: {
                        ...role,
                    }
                })
                .then(response => {
                    setRole({
                        ...role
                    });

                })
                .finally(() => {
                    setSaving(false);
                });
        } else {
            api
                .create<IRole>("roles", {
                    data: role
                })
                .then(response => {
                    setCreatedRoleId(response?.data.id);
                    setSaving(false);
                })
                .finally(() => {
                    setSaving(false);
                });
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {target: {name, value}} = e;

        setRole({
            ...role,
            [name]: value
        })
    };

    const handlePermissionClick = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (role.permissions.includes(e.target.name)) {
            setRole({
                ...role,
                permissions: role.permissions.filter(permission => permission !== e.target.name)
            });
        } else {
            setRole({
                ...role,
                permissions: [
                    ...role.permissions,
                    e.target.name
                ]
            });
        }
    };


    return {
        role,
        saving,
        createdRoleId,
        permissionsList,
        handleTextChange,
        handleSaveClick,
        handlePermissionClick
    }

};

export default useRoleState;
