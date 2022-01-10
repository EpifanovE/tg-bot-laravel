import React, {FC, ReactElement, useEffect, useState} from "react";
import CustomSelect, {IChoice} from "./CustomSelect";
import {useApi} from "../../hooks/useApi";
import useIsMounted from "../../hooks/useIsMounted";

interface IReferenceSelectProps {
    resource: string
    value: Array<string | number>
    onChange: (value: Array<string | number>) => void
    label?: string
    placeholder?: string
    multiple?: boolean
    valueField?: string
    labelField?: string
    labelRender?: (choice: any) => ReactElement
    resettable?: boolean
    disabled?: boolean
    required?: boolean
}

const ReferenceSelect: FC<IReferenceSelectProps> = (props) => {

    const {resource, value, onChange, label, placeholder, multiple, valueField, labelField, resettable, labelRender
        , disabled, required} = props;

    const api = useApi();

    const [choices, setChoices] = useState<Array<any>>();
    const [loading, setLoading] = useState(true);

    const {isMounted} = useIsMounted();

    useEffect(() => {
        api
            .getMany<{data: Array<any>}>(resource, {paginate:0})
            .then(response => {
                if (!response?.data) return;

                if (isMounted) {
                    setChoices(response.data.data);
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    const selectValueField = valueField ? valueField : "id";
    const selectLabelField = labelField ? labelField : "title";

    return <CustomSelect
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        multiple={multiple}
        valueField={selectValueField}
        labelField={selectLabelField}
        choices={choices || []}
        resettable={resettable}
        disabled={loading || disabled}
        labelRender={labelRender}
        required={required}
    />
};

export default ReferenceSelect;
