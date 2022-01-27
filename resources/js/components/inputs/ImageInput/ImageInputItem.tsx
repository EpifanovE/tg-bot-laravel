import React, {FC} from "react";
import {isImage} from "./helpers";
import Icon from "../../layout/Icon";

interface IImageInputItemProps {
    file?: File | string | null
    className?: string
}

const ImageInputItem: FC<IImageInputItemProps> = (props) => {
    const {
        file,
        className,
    } = props;

    const getUrl = () => {
        if (!file) return;

        if (typeof file === "string") {
            return file
        }

        return URL.createObjectURL(file);
    }

    return <div className={`ImageInputItem${className ? " " + className : ""}`}>
        {
            (file && isImage(file)) ?
            <img src={getUrl()} className={`ImageInputItem__Src`}/> :
                <Icon name={`file`} className={`ImageInputItem__Icon`} />
        }
        <div className={`ImageInputItem__Overlay`} />
    </div>
};

export default ImageInputItem;
