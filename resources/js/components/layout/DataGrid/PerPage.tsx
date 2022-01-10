import React, {FC} from "react";
import {IPerPageProps} from "./types";
import DropdownMenu from "../DropdownMenu";
import TextInput from "../../inputs/TextInput";
import {useTranslation} from "react-i18next";

const PerPage: FC<IPerPageProps> = (props) => {

    const {value, onChange, choices = {10: "10", 25: "25", 50: "50"}, size, label} = props;

    const handleChange = (value: string) => {
        onChange(parseInt(value));
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(parseInt(e.target.value));
    };

    return <div className="d-flex align-items-center">
        {
            label &&
            <span className="mr-2">
                {label}
            </span>
        }
        <TextInput
            value={`${value}`}
            onChange={handleTextChange}
            size={size}
            className="mb-0"
            append={<DropdownMenu
                value={`${value}`}
                onChange={handleChange}
                label={`${value}`}
                choices={choices}
                mode="outline-secondary"
            />}
        />
    </div>
};

export default PerPage;
