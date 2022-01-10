import React, {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {v4 as uuidv4} from "uuid";
import {Size} from "../../../types/app";
import FileItem from "./FileItem";

interface IFileInputProps {
    id?: string,
    name?: string,
    args?: {
        min: string
    }
    isInvalid?: boolean
    invalidFeedback?: string
    text?: string
    append?: ReactNode
    prepend?: ReactNode
    required?: boolean
    disabled?: boolean
    readOnly?: boolean
    size?: Size
    className?: string
    label?: string
    multiple?: boolean
    onChange: (files: Array<File>) => void
    files?: Array<File>
    onDeleteFileClick: (index: number) => void
}

const FileInput: FC<IFileInputProps> = ({id, multiple, onChange, files, name, onDeleteFileClick}) => {

    const {t} = useTranslation();

    const normalizedId = id ? id : uuidv4();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onChange(Array.from(e.target.files));
        }
    };

    const handleDeleteItemClick = (index: number) => {
        onDeleteFileClick(index);
    };

    return <div>
        <div className="d-flex mb-2">
            {
                !!files && files.map((file, index) => (
                        <FileItem key={index} name={file.name} index={index} onDeleteClick={handleDeleteItemClick}/>
                    )
                )
            }
        </div>
        <div className="custom-file">
            <input
                type="file"
                className="custom-file-input"
                id={normalizedId}
                multiple={multiple}
                onChange={handleChange}
                name={name}
            />
            <label className="custom-file-label" htmlFor={normalizedId}>{t("actions.chooseFiles")}</label>
        </div>
    </div>
};

export default FileInput;
