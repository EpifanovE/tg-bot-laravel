import React, {FC, useCallback, useRef,} from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {v4 as uuidv4} from "uuid";
import Icon from "../../layout/Icon";
import ImageInputItem from "./ImageInputItem";
import {IFileResponse, IFileToUpload} from "./types";
import {useTranslation} from "react-i18next";
import update from 'immutability-helper'
import DraggableImageInputItem from "./DraggableImageInputItem";

interface IImageInputProps {
    filesToUpload?: Array<IFileToUpload>
    uploadedFiles: Array<IFileResponse>
    onChange: (files: Array<IFileToUpload>) => void
    setUploadedFiles: (value: Array<IFileResponse>) => void
    onToUploadDeleteClick?: (id: string) => void
    onUploadedDeleteClick?: (id: string) => void
    className?: string
}

const ImageInput: FC<IImageInputProps> = (props) => {

    const {t} = useTranslation();

    const {
        className,
        filesToUpload,
        uploadedFiles,
        setUploadedFiles,
        onChange,
        onToUploadDeleteClick,
        onUploadedDeleteClick,
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const openFileDialog = () => {
        if (inputRef?.current) {
            inputRef.current.click();
        }
    };

    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragCard = uploadedFiles[dragIndex]
            setUploadedFiles(
                update(uploadedFiles, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                }),
            )
        },
        [uploadedFiles],
    )

    const handleFilesToUploadChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (!!e.currentTarget?.files?.length) {
            const arr = Array.prototype.map.call(e.currentTarget.files, file => {
                return {
                    id: uuidv4(),
                    file: file
                };
            });

            onChange(arr as Array<IFileToUpload>)
        }
    };

    const handleToUploadDeleteClick = (id: string) => {
        if (onToUploadDeleteClick) {
            onToUploadDeleteClick(id);
        }
    };

    const handleUploadedDeleteClick = (id: string) => {
        if (onUploadedDeleteClick) {
            onUploadedDeleteClick(id);
        }
    }

    return <div className={`ImageInput${className ? " " + className : ""}`}>
        <div
            className={`ImageInput__UploadArea`}
            onClick={openFileDialog}
        >
            {
                !!filesToUpload?.length &&
                Array.prototype.map.call(filesToUpload, file => (
                    <ImageInputItem
                        key={file.id}
                        id={file.id}
                        file={file}
                        onDeleteClick={onToUploadDeleteClick ? handleToUploadDeleteClick : undefined}
                    />
                ))
            }
            {
                !filesToUpload?.length &&
                <div className={`ImageInput__Upload`}>
                    <Icon name={`cloud-upload`} className={`ImageInput__UploadIcon`}/>
                    <span className={`ImageInput__UploadTitle`}>{t("upload")}</span>
                </div>
            }
            <input type="file" className={`ImageInput__Input`} ref={inputRef} onChange={handleFilesToUploadChange} multiple={true}/>
        </div>
        {
            !!uploadedFiles?.length &&
                <>
                    <div className={`ImageInput__SubTitle`}>{t("uploadedFiles")}</div>
                    <div className={`ImageInput__Uploaded`}>
                        <DndProvider backend={HTML5Backend}>
                        {
                            uploadedFiles.map((file, index) => (
                                <DraggableImageInputItem
                                    key={file.id}
                                    id={file.id.toString()}
                                    file={file.content}
                                    index={index}
                                    moveCard={moveCard}
                                    onDeleteClick={handleUploadedDeleteClick}
                                />
                            ))
                        }
                        </DndProvider>
                    </div>
                </>
        }
    </div>

}

export default ImageInput;
