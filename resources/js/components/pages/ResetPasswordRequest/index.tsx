import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import {IAppState} from "../../../store/reducers/appReducer";
import {passwordResetRequest} from "../../../store/actions/adminActions";
import TextInput from "../../inputs/TextInput";
import InputGroupText from "../../inputs/InputGroupText";
import Button from "../../layout/Button";
import Col from "../../layout/Ui/Col";
import {toast} from "react-toastify";

const ResetPasswordRequest = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector<IRootState, IAdminState>(state => state.admin);
    const {submitting} = useSelector<IRootState, IAppState>(state => state.app);

    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        if (!email) {
            toast.error(t("errors.fieldIsEmpty", {field: t("email")}));
            return;
        }

        if (submitting) {
            return;
        }

        dispatch(passwordResetRequest({email}));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };

    if (isLoggedIn) {
        return <Navigate to={`/`} />
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
                                value={email}
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
