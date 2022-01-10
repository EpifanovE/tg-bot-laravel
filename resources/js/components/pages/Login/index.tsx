import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, NavLink} from "react-router-dom";

import {loginRequest} from "../../../store/actions/adminActions";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import {IAppState} from "../../../store/reducers/appReducer";
import TextInput from "../../inputs/TextInput";
import InputGroupText from "../../inputs/InputGroupText";
import Button from "../../layout/Button";
import {useForm} from "../../../hooks/useForm";
import Checkbox from "../../inputs/Checkbox";
import Col from "../../layout/Ui/Col";
import Icon from "../../layout/Icon";

const Login = (props) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector<IRootState, IAdminState>(state => state.admin);
    const {submitting, prevPath} = useSelector<IRootState, IAppState>(state => state.app);

    const rules = {
        email: ["required", ],
        password: ["required",],
    };

    const {values, onBlur, errors, changed, validate, isValid, setValue} = useForm<{
        email: string,
        password: string,
        remember_me: boolean
    }>(rules);

    const {email, password, remember_me} = values;

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        validate();

        if (!isValid) {
            return
        }

        if (submitting) {
            return;
        }

        dispatch(loginRequest({email, password, remember_me}));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "remember_me") {
            setValue({fieldName: e.target.name, value: e.target.checked})
        } else {
            setValue({fieldName: e.target.name, value: e.target.value})
        }
    };

    if (isLoggedIn) {
        return <Redirect to={`${prevPath ? prevPath : "/"}`}/>
    }

    return <div className="container d-flex flex-column justify-content-center">
        <div className="row justify-content-center">
            <Col width={{md:8}}>
                <div className="card-group">
                    <div className="card p-4">
                        <div className="card-body">
                            <form action="" onSubmit={handleSubmit}>
                            <h1>{t("login")}</h1>
                            <p className="text-muted">{t("login_text")}</p>
                            <TextInput
                                placeholder="Email"
                                onChange={handleChange}
                                onBlur={onBlur}
                                touched={changed.includes("email")}
                                errors={errors.email || []}
                                value={email || ""}
                                name="email"
                                prepend={<InputGroupText><Icon name="user"/></InputGroupText>}
                                required={true}
                            />
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
                            <Checkbox
                                name="remember_me"
                                checked={remember_me || false}
                                onChange={handleChange}
                                label={t("rememberMe")}
                                className="form-group"
                            />
                            <div className="row">
                                <div className="col-6">
                                    <Button
                                        className="px-4 d-flex align-items-center"
                                        disabled={!email || !password || submitting}
                                        type="submit"
                                        color="primary"
                                        spinner={submitting}
                                    >
                                        {t("login")}
                                    </Button>
                                </div>
                                <div className="col-6 text-right">
                                    <NavLink
                                        to="/password/reset"
                                        className="btn btn-link px-0"
                                        attrs={{type: "button"}}
                                    >
                                        {t("forgot_password")}
                                    </NavLink>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Col>
        </div>
    </div>;
};

export default Login;
