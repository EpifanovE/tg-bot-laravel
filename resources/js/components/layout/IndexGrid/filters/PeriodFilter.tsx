import React, {FC,} from "react";
import {IPeriodFilterProps, IPeriodValue,} from "../types";
import PeriodInput from "../../../inputs/PeriodInput";
import Col from "../../Ui/Col";

const PeriodFilter: FC<IPeriodFilterProps> = (props) => {

    const {
        value,
        onChange,
        source,
        className,
        width,
    } = props;

    const handleChange = (value: IPeriodValue) => {
        if (onChange) {
            onChange({source: source, value: value})
        }
    }

    return <Col width={width} className={className}>
        <PeriodInput
            value={value}
            onChange={handleChange}
        />
    </Col>
}

export default PeriodFilter;
