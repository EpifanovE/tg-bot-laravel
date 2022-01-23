import React, {FC} from "react";
import {ISelectFilterProps} from "../types";
import Col from "../../Ui/Col";
import SelectInput from "../../../inputs/SelectInput";

const SelectFilter: FC<ISelectFilterProps> = ({source, value, width, onChange, choices, canBeEmpty, emptyText, size}) => {

    const handleChange = (value) => {
        if (onChange) {
            onChange({source: source, value: value});
        }
    };

    const handleResetClick = () => {
        if (onChange && !!value) {
            onChange({source: source, value: []})
        }
    };

    return <Col width={width}>
        <SelectInput
            value={value ? value : []}
            onChange={handleChange}
            resettable={true}
            onResetClick={handleResetClick}
            choices={choices}
            canBeEmpty={canBeEmpty}
            emptyText={emptyText}
            size={size}
        />
    </Col>
};

export default SelectFilter;
