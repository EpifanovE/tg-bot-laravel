import React, {FC} from "react";
import {PayloadType} from "./types";
import TextPayload from "./types/TextPayload";
import TextareaPayload from "./types/TextareaPayload";
import NumberPayload from "./types/NumberPayload";
import CheckboxPayload from "./types/CheckboxPayload";
import {useTranslation} from "react-i18next";

interface IPayloadProps {
    type: PayloadType
    value: any
    onChange: (value: any) => void
    label?: string
}

const Payload: FC<IPayloadProps> = ({type, value, onChange, label}) => {

    const {t} = useTranslation();

    const getInput = () => {
        switch (type) {
            case "textarea":
                return <TextareaPayload value={value} onChange={onChange}/>;
            case "number":
                return <NumberPayload value={value} onChange={onChange}/>;
            case "checkbox":
                return <CheckboxPayload value={value} onChange={onChange} label={label ? label : t("enabled")}/>;
            default :
                return <TextPayload value={value} onChange={onChange}/>;
        }
    };

    return <>{getInput()}</>
};

export default Payload;
