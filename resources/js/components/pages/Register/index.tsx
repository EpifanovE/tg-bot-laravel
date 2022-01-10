import React, {FC, useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import InputGroupText from "../../inputs/InputGroupText";
import TextInput from "../../inputs/TextInput";
import Button from "../../layout/Button";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import {useForm} from "../../../hooks/useForm";
import {IAppState} from "../../../store/reducers/appReducer";
import ApiProvider from "../../../api/apiProvider";
import Col from "../../layout/Ui/Col";
import {successAlert} from "../../../utils/alerts";

const Register: FC = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector<IRootState, IAdminState>(state => state.admin);
    const {prevPath} = useSelector<IRootState, IAppState>(state => state.app);

    const rules = {
        email: ["required",],
        username: ["required"],
        password: ["required", "min:8"],
        password_confirmation: ["required", "equals:password"]
    };

    const {values, onChange, onBlur, errors, touched, validate, isValid}
        = useForm<{
        email: string
        username: string
        password: string
        password_confirmation: string
    }>(rules);
    const {email, username, password, password_confirmation} = values;

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        validate();

        if (!isValid) {
            return
        }

        setSubmitting(true);

        ApiProvider
            .request<{message?: string}>({
                endpoint: "register",
                method: "post",
                config: {
                    data: values
                }
            })
            .then(response => {
                setSubmitted(true);
                if (response?.data?.message) {
                    successAlert(response.data.message);
                }
            })
            .finally(() => {
                setSubmitting(false);
            })

    };

    if (isLoggedIn) {
        return <Redirect to={`${prevPath ? prevPath : "/"}`}/>
    }

    return (
        <div className="container d-flex flex-column justify-content-center">
            <div className="row justify-content-center">
                <Col width={{md:6}}>
                    <div className="card">
                        <div className="card-body p-4">
                            <form action="" onSubmit={handleSubmit} noValidate={true}>
                                <h1>{t("registration")}</h1>
                                <p className="text-muted">{t("registrationFormText")}</p>
                                <TextInput
                                    placeholder={t("username")}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={username || ""}
                                    name="username"
                                    prepend={<InputGroupText><i className="c-icon cil-user"/></InputGroupText>}
                                    required={true}
                                    className="mb-3"
                                    errors={errors.username || []}
                                    touched={touched.includes("username")}
                                    disabled={submitted || submitting}
                                />

                                <TextInput
                                    placeholder={t("email")}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={email || ""}
                                    name="email"
                                    prepend={<InputGroupText><i className="c-icon cil-envelope-open"/></InputGroupText>}
                                    required={true}
                                    errors={errors.email || []}
                                    className="mb-3"
                                    touched={touched.includes("email")}
                                    disabled={submitted || submitting}
                                />

                                <TextInput
                                    placeholder={t("password")}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={password || ""}
                                    name="password"
                                    prepend={<InputGroupText><i className="c-icon cil-lock-locked"/></InputGroupText>}
                                    type="password"
                                    required={true}
                                    errors={errors.password || []}
                                    touched={touched.includes("password")}
                                    disabled={submitted || submitting}
                                />

                                <TextInput
                                    placeholder={t("passwordConfirm")}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={password_confirmation || ""}
                                    name="password_confirmation"
                                    prepend={<InputGroupText><i className="c-icon cil-lock-locked"/></InputGroupText>}
                                    type="password"
                                    required={true}
                                    errors={errors.password_confirmation || []}
                                    touched={touched.includes("password_confirmation")}
                                    disabled={submitted || submitting}
                                />
                                <Button
                                    type="submit"
                                    color="primary"
                                    className="btn-block"
                                    spinner={submitting}
                                    disabled={submitted}
                                >
                                    {t("register")}
                                </Button>
                                <NavLink to="/login" className="btn btn-block btn-ghost-primary">{t("login")}</NavLink>
                            </form>
                        </div>
                    </div>
                </Col>
            </div>
        </div>
    )
};

export default Register;
