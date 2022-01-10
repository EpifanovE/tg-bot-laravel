import React, {cloneElement} from "react";
import {IFilterData, IFiltersProps} from "./types";

const Filters = ({filters, onChange, values, size} : IFiltersProps) => {

    const handleChangeFilter = (data : IFilterData) => {
        onChange(data)
    };

    const filtersEls = filters?.map(
        (filter, index) => cloneElement(filter, {
            key: index,
            onChange: handleChangeFilter,
            value: values[filter.props.source],
            size: size
        }));
    return <div className="row">
        {filtersEls}
    </div>
};

export default Filters;
