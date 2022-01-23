import React, {FC, useEffect} from "react";
import TextInput from "../../../inputs/TextInput";
import {ITextFilterProps} from "../types";
import Col from "../../Ui/Col";

const TextFilter: FC<ITextFilterProps> = ({source, value, onChange, label, width, size}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange({source: source, value: e.target.value});
        }
    };

    const handleResetClick = () => {
        if (onChange && !!value) {
            onChange({source: source, value: ""});
        }
    };

    return <Col width={width}>
        <TextInput
            value={value ? value : ""}
            onChange={handleChange}
            placeholder={label}
            resettable={true}
            onResetClick={handleResetClick}
            size={size}
        />
    </Col>
};

export default TextFilter;
