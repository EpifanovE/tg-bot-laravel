import React, {useEffect, useState} from "react";
import Tabs from "../../layout/Tabs/Tabs";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import {profileSaveRequest} from "../../../store/actions/adminActions";
import Button from "../../layout/Button";
import Icon from "../../layout/Icon";
import TextInput from "../../inputs/TextInput";
import InputGroupText from "../../inputs/InputGroupText";
import {toast} from "react-toastify";

const Profile = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const data = useSelector<IRootState, IAdminState>(state => state.admin);
    const {saving, name: storeName, email: storeEmail} = data;

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");

    useEffect(() => {
        setUsername(storeName || "");
    }, [storeName]);

    useEffect(() => {
        setEmail(storeEmail || "");
    }, [storeEmail]);

    const handleSaveClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!username) {
            toast.error(t("errors.fieldIsEmpty", {field: t("username")}));
            return;
        }

        if (!email) {
            toast.error(t("errors.fieldIsEmpty", {field: t("email")}));
            return;
        }

        dispatch(profileSaveRequest({
            username,
            email,
            password,
            password_confirmation
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "username" :
                setUsername(e.target.value);
                break;
            case "email" :
                setEmail(e.target.value);
                break;
            case "password" :
                setPassword(e.target.value);
                break;
            case "password_confirmation":
                setPasswordConfirmation(e.target.value);
                break;
        }
    };

    const profileTabContent = () => {
        return <>
            <TextInput
                label={t("username")}
                value={username}
                onChange={handleChange}
                name="username"
                prepend={<InputGroupText><Icon name="user"/></InputGroupText>}
            />

            <TextInput
                label={t("email")}
                value={email}
                onChange={handleChange}
                name="email"
                prepend={<InputGroupText><Icon name="envelope-closed"/></InputGroupText>}
            />

            <TextInput
                label={t("new_password")}
                onChange={handleChange}
                value={password}
                name="password"
                prepend={<InputGroupText><Icon name="lock-locked"/></InputGroupText>}
                type="password"
            />

            <TextInput
                label={t("passwordConfirm")}
                value={password_confirmation}
                onChange={handleChange}
                name="password_confirmation"
                prepend={<InputGroupText><Icon name="lock-locked"/></InputGroupText>}
                type="password"
            />
        </>
    };


    return <div className="row">
        <div className="col-12">
            <div className="d-flex justify-content-end mb-4">
                <Button
                    color="primary"
                    className="d-flex align-items-center"
                    type="button"
                    onClick={handleSaveClick}
                    spinner={saving}
                >
                    <Icon name="save" className="mr-2"/>
                    {t("buttons.save")}
                </Button>
            </div>
            <Tabs
                tabs={[
                    {
                        id: "1",
                        label: t("profile"),
                        component: profileTabContent()
                    },
                ]}
            />
        </div>
    </div>
};

export default Profile;
