import React, {FC, useRef} from "react";
import ImageInputItem, {IImageInputItemProps} from "./ImageInputItem";
import {DropTargetMonitor, useDrag, useDrop} from "react-dnd";
import {ItemTypes} from "./types";

interface DragItem {
    index: number
    id: string
    type: string
}

interface IDraggableImageInputItemProps extends IImageInputItemProps {
    id: string
    index: number
    moveCard?: (dragIndex: number, hoverIndex: number) => void
    onDeleteClick?: (id: string) => void
}

const DraggableImageInputItem: FC<IDraggableImageInputItemProps> = (props) => {

    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            if (moveCard) {
                moveCard(dragIndex, hoverIndex)
            }

            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const {
        id,
        index,
        moveCard,
        className,
        file,
        onDeleteClick,
    } = props;

    drag(drop(ref));

    return <div ref={ref} data-handler-id={handlerId}><ImageInputItem id={id} file={file} className={className} onDeleteClick={onDeleteClick} /></div>
}

export default DraggableImageInputItem;
