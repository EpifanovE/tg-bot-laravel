import React, {FC} from "react";
import {IPerPageProps} from "./types";
import DropdownMenu from "../DropdownMenu";
import TextInput from "../../inputs/TextInput";
import {useTranslation} from "react-i18next";
import {DEFAULT_PER_PAGE} from "./DataGrid";

const PerPage: FC<IPerPageProps> = (props) => {

    const {value, onChange, choices = {10: "10", 25: "25", 50: "50"}, size, label} = props;

    const handleChange = (value: string) => {
        onChange(value);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleBlur = () => {
        if (!value) {
            onChange(DEFAULT_PER_PAGE)
        }
    }

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
            onBlur={handleBlur}
            size={size}
            className="mb-0"
            type={`number`}
            append={<DropdownMenu
                value={`${value}`}
                onChange={handleChange}
                label={`${value}`}
                choices={choices}
                mode="outline-secondary"
                dropup={true}
            />}
        />
    </div>
};

export default PerPage;
