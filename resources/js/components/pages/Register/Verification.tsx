import React, {useEffect, useState} from "react";
import Spinner from "../../layout/Ui/Spinner";
import {useParams, Redirect} from "react-router-dom";
import {getErrorResponseMessages} from "../../../utils/errors";
import ApiProvider from "../../../api/apiProvider";
import Col from "../../layout/Ui/Col";
import {showAlerts, successAlert} from "../../../utils/alerts";

const Verification = () => {
    const {token, email} = useParams();

    const [loading, setLoading] = useState(true);
    const [fail, setFail] = useState(false);

    useEffect(() => {

        if (!token || !email) {
            return;
        }

        ApiProvider
            .request<{message?: string}>({
                method: "post",
                endpoint: "verification",
                config: {
                    data: {token, email}
                }
            })
            .then(response => {
                if (response?.data?.message) {
                    successAlert(response.data.message);
                }
            })
            .catch(error => {
                setFail(true);
                showAlerts(getErrorResponseMessages(error));
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    const getContent = () => {
        if (loading) {
            return <Spinner size="lg" />
        }

        if (!fail) {
            return <Redirect to="/login" />
        }

        return <></>
    };

    return (
        <div className="container d-flex flex-column justify-content-center">
            <div className="row justify-content-center">
                {getContent()}
            </div>
        </div>
    )
};

export default Verification;
