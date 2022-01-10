import React, {useEffect, useState} from "react";
import Tabs from "../../layout/Tabs/Tabs";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import {changeProfileField, changeProfileFields, profileSaveRequest} from "../../../store/actions/adminActions";
import Button from "../../layout/Button";
import Icon from "../../layout/Icon";
import TextInput from "../../inputs/TextInput";
import InputGroupText from "../../inputs/InputGroupText";
import SelectInput from "../../inputs/SelectInput";
import {useForm} from "../../../hooks/useForm";

const Profile = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const data = useSelector<IRootState, IAdminState>(state => state.admin);
    const {locale, saving, name: storeName, email: storeEmail} = data;

    const rules = {
        name: ["required",],
        email: ["required",],
        password: ["nullable", "min:8",],
        password_confirmation: ["equals:password",],
    };

    const {values, onBlur, errors, validate, isValid, setValue, changed} = useForm<{
        name: string,
        email: string,
        password?: string,
        password_confirmation?: string
    }>(rules, {
        name: storeName || "",
        email: storeEmail || "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        dispatch(changeProfileFields(values))
    }, [values]);

    const {name, email, password, password_confirmation} = values;

    const handleChangeLocale = (value: Array<string>) => {
        dispatch(changeProfileField({fieldName: 'locale', value: value[0]}));
    };

    const handleSaveClick = (e: React.MouseEvent) => {
        e.preventDefault();

        validate();

        if (!isValid) {
            return;
        }

        dispatch(profileSaveRequest());
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({fieldName: e.target.name, value: e.target.value})
    };

    const isTouched = (name: string) => {
        return changed.includes(name)
    };

    const profileTabContent = () => {
        return <>
            <TextInput
                label={t("username")}
                value={name || ""}
                onChange={handleChange}
                onBlur={onBlur}
                touched={isTouched("name")}
                errors={errors.name || []}
                name="name"
                prepend={<InputGroupText><Icon name="user"/></InputGroupText>}
            />

            <TextInput
                label={t("email")}
                value={email || ""}
                onChange={handleChange}
                onBlur={onBlur}
                touched={isTouched("email")}
                errors={errors.email || []}
                name="email"
                prepend={<InputGroupText><Icon name="envelope-closed"/></InputGroupText>}
            />

            <TextInput
                label={t("new_password")}
                onChange={handleChange}
                value={password || ""}
                onBlur={onBlur}
                touched={isTouched("password")}
                errors={errors.password || []}
                name="password"
                prepend={<InputGroupText><Icon name="lock-locked"/></InputGroupText>}
                type="password"
            />

            <TextInput
                label={t("passwordConfirm")}
                value={password_confirmation || ""}
                onChange={handleChange}
                onBlur={onBlur}
                touched={isTouched("password_confirmation")}
                errors={errors.password_confirmation || []}
                name="password_confirmation"
                prepend={<InputGroupText><Icon name="lock-locked"/></InputGroupText>}
                type="password"
            />
        </>
    };

    const settingsTabContent = () => {
        return <>
            <SelectInput
                label={t("locale")}
                value={[locale]}
                onChange={handleChangeLocale}
                choices={{ru: t("localeRu"), en: t("localeEn")}}
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
                    disabled={!isValid}
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
                    // {
                    //     id: "2",
                    //     label: t("settings"),
                    //     component: settingsTabContent()
                    // },
                ]}
            />
        </div>
    </div>
};

export default Profile;
