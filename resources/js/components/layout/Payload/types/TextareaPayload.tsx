import React, {FC} from "react";
import {IPayloadInputProps} from "../types";
import TextareaInput from "../../../inputs/TextareaInput";

const TextareaPayload: FC<IPayloadInputProps> = ({value, onChange}) => {

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return <TextareaInput value={value} onChange={handleChange} />
};

export default TextareaPayload;
