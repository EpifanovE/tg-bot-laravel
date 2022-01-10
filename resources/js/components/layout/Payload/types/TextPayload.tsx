import React, {FC} from "react";
import {IPayloadInputProps} from "../types";
import TextInput from "../../../inputs/TextInput";

const TextPayload: FC<IPayloadInputProps> = ({value, onChange}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return <TextInput value={value} onChange={handleChange} />
};

export default TextPayload;
