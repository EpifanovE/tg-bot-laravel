import React, {FC} from "react";
import {IPayloadInputProps} from "../types";
import TextInput from "../../../inputs/TextInput";

const NumberPayload: FC<IPayloadInputProps> = ({value, onChange}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return <TextInput type="number" value={value} onChange={handleChange} />
};

export default NumberPayload;
