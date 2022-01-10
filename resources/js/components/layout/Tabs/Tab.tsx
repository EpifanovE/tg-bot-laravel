import React, {FC} from "react";
import {ITabProps} from "../../../types/app";
import Badge from "../Badge/Badge";

const Tab: FC<ITabProps> = ({id, label, isActive, onClick, badge, badgeMode}) => {

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClick(id);
    };

    return <li className="nav-item">
        <a className={`nav-link${isActive ? " active" : ""}`} href="#" onClick={handleClick}>
            {label}
            {
                badge &&
                    <Badge mode={badgeMode ? badgeMode : "primary"} className="ml-2">{badge}</Badge>
            }
        </a>
    </li>
};

export default Tab;
