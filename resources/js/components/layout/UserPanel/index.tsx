import React from "react";
import Menu from "./Menu";
import {useDispatch, useSelector} from "react-redux";
import {toggleUserPanelMenu} from "../../../store/actions/appActions";
import {IRootState} from "../../../store/reducers/rootReducer";
import {IAdminState} from "../../../store/reducers/adminReducer";
import {ASSETS_PREFIX} from "../../../constants";

const UserPanel = (props) => {

    const dispatch = useDispatch();

    const {avatar} = useSelector<IRootState, IAdminState>(state => state.admin);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(toggleUserPanelMenu());
    };

    return <li className="c-header-nav-item dropdown">
        <a className="c-header-nav-link" href="#" onClick={handleClick}>
            <div className={`c-avatar${!avatar ? " c-avatar-empty" : ""}`}>
                <img className="c-avatar-img" src={avatar ? avatar : `/img/admin.svg`}
                     alt="user@email.com"/>
            </div>
        </a>
        <Menu/>
    </li>
};

export default UserPanel;
