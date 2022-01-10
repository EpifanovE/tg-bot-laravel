import React, {FC} from "react";
import Button from "../../layout/Button";
import Icon from "../../layout/Icon";
import Badge from "../../layout/Badge/Badge";

interface IFileItemProps {
    index: number
    name: string
    onDeleteClick: (index: number) => void
}

const FileItem: FC<IFileItemProps> = ({index, name, onDeleteClick}) => {

    const handleDeleteClick = () => {
        onDeleteClick(index);
    };

    return <Badge
        key={index}
        mode="secondary"
        className="d-flex align-items-center mr-2 p-1 pl-2"
    >
                        <span className="mr-2">
                        {name}
                        </span>
        <Button
            color="ghost-dark"
            size="sm"
            className="d-flex align-items-center"
            onClick={handleDeleteClick}
        >
            <Icon name="x" />
        </Button>
    </Badge>
};

export default FileItem;
