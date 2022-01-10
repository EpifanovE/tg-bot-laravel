import React, {FC} from "react";
import {ITabPaneProps} from "../../../types/app";

const TabPane : FC<ITabPaneProps> = ({children, isActive}) => {
    return <div className={`tab-pane${isActive ? " active" : ""}`}>
        {children}
    </div>
};

export default TabPane;
