import React, {FC} from "react";
import {IFilterComponentValue, IFilterProps} from "../types";
import Col, {IColProps} from "../../Ui/Col";
import ReferenceSelect from "../../../inputs/ReferenceSelect";

interface IReferenceSelectFilterProps extends IFilterProps, IColProps {
    value?: Array<string>
    canBeEmpty?: boolean
    emptyText?: string
    reference: string
    labelField?: string
    valueField?: string
    multiple?: boolean
}

const ReferenceSelectFilter: FC<IReferenceSelectFilterProps> = (props) => {

    const {source, value, width, onChange, canBeEmpty, emptyText, size, reference, multiple, valueField, labelField} = props;

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

    return <Col width={width} className="mb-3">
        <ReferenceSelect
            value={value || []}
            onChange={handleChange}
            resource={reference}
            placeholder={emptyText}
            multiple={multiple}
            valueField={valueField}
            labelField={labelField}
            resettable={true}
        />
    </Col>
};

export default ReferenceSelectFilter;
