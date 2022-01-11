import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams} from "react-router-dom";

import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import {IAppState} from "../../../store/reducers/appReducer";
import {passwordSetRequest} from "../../../store/actions/adminActions";
import InputGroupText from "../../inputs/InputGroupText";
import TextInput from "../../inputs/TextInput";
import Button from "../../layout/Button";
import Col from "../../layout/Ui/Col";
import Icon from "../../layout/Icon";
import {toast} from "react-toastify";

const ResetPasswordReset = (props) => {
    const {t} = useTranslation();
    const {token, email} = useParams();
    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector<IRootState, IAdminState>(state => state.admin);
    const {submitting} = useSelector<IRootState, IAppState>(state => state.app);

    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        if (!password) {
            toast.error(t("errors.fieldIsEmpty", {field: t("password")}));
            return;
        }

        if (!password_confirmation) {
            toast.error(t("errors.fieldIsEmpty", {field: t("password_confirmation")}));
            return;
        }

        if (submitting) {
            return;
        }

        dispatch(passwordSetRequest({password, password_confirmation, token, email}));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "password" :
                setPassword(e.target.value);
                break;
            case "password_confirmation":
                setPasswordConfirmation(e.target.value);
                break;
        }
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
                                value={password || ""}
                                name="password"
                                prepend={<InputGroupText><Icon name="lock-locked"/></InputGroupText>}
                                type="password"
                                required={true}
                            />

                            <TextInput
                                placeholder={t("passwordConfirm")}
                                onChange={handleChange}
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
