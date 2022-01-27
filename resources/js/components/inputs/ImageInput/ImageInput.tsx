import React, {FC, useRef,} from "react";
import Icon from "../../layout/Icon";
import ImageInputItem from "./ImageInputItem";
import {IFileResponse} from "./types";
import {useTranslation} from "react-i18next";

interface IImageInputProps {
    filesToUpload?: FileList
    uploadedFiles?: Array<IFileResponse>
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
    className?: string
}

const ImageInput: FC<IImageInputProps> = (props) => {

    const {t} = useTranslation();

    const {
        className,
        filesToUpload,
        uploadedFiles,
        onChange,
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const openFileDialog = () => {
        if (inputRef?.current) {
            inputRef.current.click();
        }
    };

    return <div className={`ImageInput${className ? " " + className : ""}`}>
        <div
            className={`ImageInput__UploadArea`}
            onClick={openFileDialog}
        >
            {
                !!filesToUpload?.length &&
                Array.prototype.map.call(filesToUpload, file => <ImageInputItem key={file.name} file={file}/>)
            }
            {
                !filesToUpload?.length &&
                <div className={`ImageInput__Upload`}>
                    <Icon name={`cloud-upload`} className={`ImageInput__UploadIcon`}/>
                    <span className={`ImageInput__UploadTitle`}>{t("upload")}</span>
                </div>
            }
            <input type="file" className={`ImageInput__Input`} ref={inputRef} onChange={onChange} multiple={true}/>
        </div>
        {
            !!uploadedFiles?.length &&
                <>
                    <div className={`ImageInput__SubTitle`}>{t("uploadedFiles")}</div>
                    <div className={`ImageInput__Uploaded`}>
                        {
                            uploadedFiles.map(file => <ImageInputItem key={file.id} file={file.content}/>)
                        }
                    </div>
                </>
        }
    </div>

}

export default ImageInput;
