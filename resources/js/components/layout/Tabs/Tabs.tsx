import React, {FC, useEffect, useState} from "react";
import {ITabsProps} from "../../../types/app";
import Tab from "./Tab";
import TabPane from "./TabPane";

const Tabs: FC<ITabsProps> = ({tabs}) => {

    const [active, setActive] = useState<string>();

    useEffect(() => {
        setActive(tabs[0].id);
    }, []);

    const handleClick = (key: string) => {
        setActive(key);
    };

    const links = tabs.map(tab => <Tab
        key={tab.id}
        id={tab.id}
        label={tab.label}
        isActive={active === tab.id}
        badge={tab.badge}
        badgeMode={tab.badgeMode}
        onClick={handleClick}
    />);

    const content = tabs.map(tab => <TabPane key={tab.id} isActive={active === tab.id}>{tab.component}</TabPane>);

    return <>
        <ul className="nav nav-tabs">
            {links}
        </ul>
        <div className="tab-content">
            {content}
        </div>
        </>
};

export default Tabs;
