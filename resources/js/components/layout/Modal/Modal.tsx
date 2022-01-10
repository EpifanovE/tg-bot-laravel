import React, {FC, ReactElement, useEffect} from "react";

interface IModalProps {
    show: boolean
    onCloseClick: () => void
    title: string
    actions?: ReactElement
}

const Modal: FC<IModalProps> = ({show, onCloseClick, title, children, actions}) => {

    useEffect(() => {
        if (show) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [show]);

    const handleCloseClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onCloseClick();
    };

    const modalClasses = `modal fade${show ? " show" : ""}`;
    const modalStyles = show ? {
        display: "block",
        paddingRight: "17px",
    } : {};
    const backdropClasses = `modal-backdrop fade${show ? " show" : ""}`;

    return (
        <>
            <div className={modalClasses} style={modalStyles}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="close" onClick={handleCloseClick}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            {
                                actions
                            }
                            {/*<button type="button" className="btn btn-secondary">Close</button>*/}
                            {/*<button type="button" className="btn btn-primary">Save changes</button>*/}
                        </div>
                    </div>
                </div>
            </div>
            {
                show &&
                <div className={backdropClasses} />
            }
        </>
    )
};

export default Modal;
