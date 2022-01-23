import React, {FC, useEffect, useState} from "react";
import {IPerPageProps} from "./types";
import DropdownMenu from "../DropdownMenu";
import TextInput from "../../inputs/TextInput";
import {DEFAULT_PER_PAGE} from "./constants";
import Button from "../Button";
import Icon from "../Icon";

const PerPage: FC<IPerPageProps> = (props) => {

    const {
        value,
        onChange,
        choices = {10: "10", 25: "25", 50: "50"},
        size,
        label,
        disabled,
    } = props;

    const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        if (value) {
            setPerPage(value)
        }
    }, []);

    const handleChange = (value: string) => {
        onChange(value);
        setPerPage(value);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPerPage(e.target.value);
        setChanged(true);
    };

    const handleBlur = () => {
        if (!perPage) {
            setPerPage(DEFAULT_PER_PAGE.toString())
        }
    }

    const handleApplyClick = () => {
        if (perPage) {
            onChange(perPage)
        } else {
            onChange(DEFAULT_PER_PAGE)
        }
        setChanged(false);
    }

    return <div className="d-flex align-items-center">
        {
            label &&
            <span className="mr-2">
                {label}
            </span>
        }
        <TextInput
            value={`${perPage}`}
            onChange={handleTextChange}
            onBlur={handleBlur}
            size={size}
            className="mb-0"
            type={`number`}
            disabled={disabled}
            append={<div className={`btn-group dropup`}>
                {
                    changed &&
                    <Button color={`outline-secondary`} onClick={handleApplyClick}>
                        <Icon name={`check`} className={`m-0`} />
                    </Button>
                }
                <DropdownMenu
                    value={`${perPage}`}
                    onChange={handleChange}
                    label={`${value}`}
                    choices={choices}
                    mode="outline-secondary"
                    disabled={disabled}
                />
            </div>}
        />
    </div>
};

export default PerPage;
