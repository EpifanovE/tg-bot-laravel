import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import {IAppState} from "../../../store/reducers/appReducer";
import {passwordResetRequest} from "../../../store/actions/adminActions";
import {useForm} from "../../../hooks/useForm";
import TextInput from "../../inputs/TextInput";
import InputGroupText from "../../inputs/InputGroupText";
import Button from "../../layout/Button";
import Col from "../../layout/Ui/Col";

const ResetPasswordRequest = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector<IRootState, IAdminState>(state => state.admin);
    const {submitting} = useSelector<IRootState, IAppState>(state => state.app);

    const rules = {
        email: ["required", ],
    };

    const {values, setValue, onBlur, errors, changed, validate, isValid} = useForm<{ email: string }>(rules);

    const {email} = values;

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        validate();

        if (!isValid) {
            return;
        }

        if (submitting) {
            return;
        }

        dispatch(passwordResetRequest({email}));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({fieldName: e.target.name, value: e.target.value})
    };

    if (isLoggedIn) {
        return <Redirect to={`/`} />
    }

    return <div className="container d-flex flex-column justify-content-center">
        <div className="row justify-content-center">
            <Col width={{lg: 5}}>
                <form action="" onSubmit={handleSubmit} noValidate={true}>
                    <div className="card">
                        <div className="card-header">
                            {t("resetPassword")}
                        </div>
                        <div className="card-body">
                            <p className="text-medium-emphasis">{t("resetPasswordText")}</p>
                            <TextInput
                                placeholder="Email"
                                onChange={handleChange}
                                onBlur={onBlur}
                                touched={changed.includes("email")}
                                errors={errors.email || []}
                                value={email || ""}
                                name="email"
                                prepend={<InputGroupText><i className="c-icon cil-user"/></InputGroupText>}
                                required={true}
                            />
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <Col>
                                    <Button
                                        color="primary"
                                        spinner={submitting}
                                        type="submit"
                                    >{t("reset")}</Button>
                                </Col>
                            </div>
                        </div>
                    </div>
                </form>
            </Col>
        </div>
    </div>;
};

export default ResetPasswordRequest;
