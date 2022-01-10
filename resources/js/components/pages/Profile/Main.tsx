import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import TextInput from "../../inputs/TextInput";
import InputGroupText from "../../inputs/InputGroupText";
import Icon from "../../layout/Icon";

interface IMainProps {
    name?: string
    email?: string
    password?: string
    password_confirmation?: string
    onChange: ({fieldName: string, value: any}) => void
}

const Main: FC<IMainProps> = ({onChange, name, email, password, password_confirmation}) => {

    const {t} = useTranslation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({fieldName: e.target.name, value: e.target.value})
    };

    return <>
        <TextInput
            label={t("username")}
            value={name || ""}
            onChange={handleChange}
            name="name"
            prepend={<InputGroupText><Icon name="user" /></InputGroupText>}
        />

        <TextInput
            label={t("email")}
            value={email || ""}
            onChange={handleChange}
            name="email"
            prepend={<InputGroupText><Icon name="envelope-closed" /></InputGroupText>}
        />

        <TextInput
            label={t("new_password")}
            onChange={handleChange}
            value={password || ""}
            name="password"
            prepend={<InputGroupText><Icon name="lock-locked" /></InputGroupText>}
            type="password"
        />

        <TextInput
            label={t("passwordConfirm")}
            value={password_confirmation || ""}
            onChange={handleChange}
            name="password_confirmation"
            prepend={<InputGroupText><Icon name="lock-locked" /></InputGroupText>}
            type="password"
        />
    </>
};

export default Main;
