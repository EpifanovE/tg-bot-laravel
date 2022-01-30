import React, {FC} from "react";
import {isImage} from "./helpers";
import Icon from "../../layout/Icon";
import {IFileToUpload} from "./types";

export interface IImageInputItemProps {
    id: string
    file?: IFileToUpload | string | null
    onDeleteClick?: (id: string) => void
    className?: string
}

const ImageInputItem: FC<IImageInputItemProps> = (props) => {
    const {
        id,
        file,
        onDeleteClick,
        className,
    } = props;

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (onDeleteClick) {
            onDeleteClick(id)
        }
    }

    const getUrl = () => {
        if (!file) return;

        if (typeof file === "string") {
            return file
        }

        return URL.createObjectURL(file.file);
    }

    return <div className={`ImageInputItem${className ? " " + className : ""}`} >
        {
            (file && isImage(file)) ?
            <img src={getUrl()} className={`ImageInputItem__Src`}/> :
                <Icon name={`file`} className={`ImageInputItem__Icon`} />
        }
        <div className={`ImageInputItem__Overlay`} />
        <div className={`ImageInputItem__Actions`}>
            {
                onDeleteClick &&
                <button className={`ImageInputItem__Action Action`} onClick={handleDeleteClick}>
                    <img src="data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.21903 5.78103L5.78003 7.22003L14.563 16L5.78003 24.781L7.22003 26.22L16 17.437L24.781 26.219L26.219 24.781L17.437 16L26.219 7.21903L24.78 5.78003L16 14.563L7.21903 5.78103Z' /%3E%3C/svg%3E" className={`Action__Icon`}/>
                </button>
            }
        </div>
    </div>
};

export default ImageInputItem;
