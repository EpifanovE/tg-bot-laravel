import React, {FC} from "react";
import {IPayloadInputProps} from "../types";
import Checkbox from "../../../inputs/Checkbox";

interface ICheckboxPayloadProps extends IPayloadInputProps {
    label: string
}

const CheckboxPayload: FC<ICheckboxPayloadProps> = ({value, onChange, label}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    return <Checkbox checked={value} onChange={handleChange} label={label} />
};

export default CheckboxPayload;
