import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams} from "react-router-dom";

import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import {IAppState} from "../../../store/reducers/appReducer";
import {passwordSetRequest} from "../../../store/actions/adminActions";
import InputGroupText from "../../inputs/InputGroupText";
import TextInput from "../../inputs/TextInput";
import {useForm} from "../../../hooks/useForm";
import Button from "../../layout/Button";
import Col from "../../layout/Ui/Col";
import Icon from "../../layout/Icon";

const ResetPasswordReset = (props) => {
    const {t} = useTranslation();
    const {token, email} = useParams();
    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector<IRootState, IAdminState>(state => state.admin);
    const {submitting} = useSelector<IRootState, IAppState>(state => state.app);

    const rules = {
        password: ["required", "min:8", ],
        password_confirmation: ["equals:password",],
    };

    const {values, onBlur, errors, isValid, setValue, changed, validate} = useForm<{
        password: string,
        password_confirmation: string
    }>(rules);

    const {password, password_confirmation} = values;

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        validate();

        if (!isValid) {
            return;
        }

        if (submitting) {
            return;
        }

        dispatch(passwordSetRequest({password, password_confirmation, token, email}));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({fieldName: e.target.name, value: e.target.value})
    };

    if (isLoggedIn) {
        return <Redirect to={`/`} />
    }

    return <div className="container d-flex flex-column justify-content-center">
        <div className="row justify-content-center">
            <Col width={{lg:5}}>
                <form action="" onSubmit={handleSubmit} noValidate={true}>
                    <div className="card">
                        <div className="card-header">
                            {t("newPassword")}
                        </div>
                        <div className="card-body">
                            <p className="text-medium-emphasis">{t("newPasswordText")}</p>
                            <TextInput
                                placeholder={t("password")}
                                onChange={handleChange}
                                onBlur={onBlur}
                                touched={changed.includes("password")}
                                errors={errors.password || []}
                                value={password || ""}
                                name="password"
                                prepend={<InputGroupText><Icon name="lock-locked"/></InputGroupText>}
                                type="password"
                                required={true}
                            />

                            <TextInput
                                placeholder={t("passwordConfirm")}
                                onChange={handleChange}
                                onBlur={onBlur}
                                touched={changed.includes("password_confirmation")}
                                errors={errors.password_confirmation || []}
                                value={password_confirmation || ""}
                                name="password_confirmation"
                                prepend={<InputGroupText><Icon name="lock-locked"/></InputGroupText>}
                                type="password"
                                required={true}
                            />
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <Col width={{lg:5}}>
                                    <Button
                                        color="primary"
                                        spinner={submitting}
                                        type="submit"
                                    >{t("set")}</Button>
                                </Col>
                            </div>
                        </div>
                    </div>
                </form>
            </Col>
        </div>
    </div>;
};

export default ResetPasswordReset;
