import { v4 as uuidv4 } from 'uuid';
import {IAlert} from "../types/app";
import i18next from "i18next";

export const getErrorResponseMessages = (errors: any) : Array<IAlert> => {

    if (errors.response?.data?.errors) {
        return Object.entries(errors.response.data.errors).reduce((acc: Array<IAlert>, error: Array<any>) => {
            if (error[1].lenght === 1) {
                return [
                    ...acc,
                    {
                        id: uuidv4(),
                        message: error[1][0],
                        mode: "danger"
                    }
                ]
            } else {
                const messages = error[1].map(message => {
                    return {
                        id: uuidv4(),
                        message: message,
                        mode: "danger"
                    }
                });

                return [
                    ...acc,
                    ...messages
                ]
            }
        }, []);
    }

    if (errors.response && errors.response.data && errors.response.data.message) {
        return [{
            id: uuidv4(),
            message: errors.response.data.message,
            mode: "danger"
        }];
    }

    if (errors.message) {
        return [{
            id: uuidv4(),
            message: errors.message,
            mode: "danger"
        }];
    }

    return [{
        id: uuidv4(),
        message: i18next.t("defaultErrorText"),
        mode: "danger"
    }];
};
