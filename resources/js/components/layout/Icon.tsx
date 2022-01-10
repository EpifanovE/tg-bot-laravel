import React, {FC} from "react";

interface IIconProps {
    name: string
    className?: string
    solid?: boolean
}

const Icon: FC<IIconProps> = ({name, className, solid}) => {
    return <i className={`c-icon ${solid ? "cis" : "cil"}-${name}${className ? " " + className : ""}`} />
};

export default Icon;
