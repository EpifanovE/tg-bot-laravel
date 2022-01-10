import React, {FC} from "react";
import Spinner from "./Ui/Spinner";

interface IButtonProps {
    onClick?: (e: React.MouseEvent) => void
    color?: string
    type?: "button" | "submit" | "reset"
    className?: string
    href?: string
    size?: string
    disabled?: boolean
    spinner?: boolean
}

const Button: FC<IButtonProps> = ({onClick, color, type, className, href, children, size, disabled, spinner}) => {
    const Tag = href ? "a" : "button";
    const attrs = href ? {href: href} : {type: type ? type : "button"};

    const classes = `btn${color ? " btn-" + color : ""}${size ? " btn-" + size : ""}${className ? " " + className : ""}`;

    return <Tag {...attrs} onClick={onClick} className={classes} disabled={disabled}>
        {children}
        {
            spinner &&
            <Spinner className="ml-2" size="sm"/>
        }
    </Tag>
};

export default Button;
