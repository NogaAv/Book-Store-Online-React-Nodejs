import { Link } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/Auth.context.jsx';
import { CartContext } from '../../../contexts/cart.context.jsx';
import { UserContext } from '../../../contexts/User.context.jsx';
import { mode, securityModeContext } from '../../../contexts/SecurityMode.context.jsx';
import { cartActionType } from '../../../actions/cart.actions.js';
import creatCartAction from '../../../actions/cart.actions.js';
import HeaderUserInfo from './header-user-info/HeaderUserInfo.component.jsx';
import HeaderAdminInfo from './header-admin-info/HeaderAdminInfo.component.jsx';
import HumburgerBtn from './humburger-btn/HumburgerBtn.component.jsx';
import Sidebar from '../sideBar/Sidebar.component.jsx';
import { getUserAccount } from '../../../services/user.service.js';
import { getAdminAccount } from '../../../services/admin.service.js';
import { USER_NAME, ADMIN_NAME } from '../../../constants/constants.js';

import bookIcon from '../../../assets/img/book-icon.png';
import './header.styles.css';

const Header = () => {
    const userContextValue = useContext(UserContext);
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);
    const secModeContextValue = useContext(securityModeContext);

    const [showSideBar, setIsSideBarShown] = useState(false);

    const isUserModeOn = secModeContextValue.secModesState < mode.switchOn_adminNotLogged;
    const isUserLogged =
        secModeContextValue.secModesState === mode.SwitchOff_userLogged ||
        secModeContextValue.secModesState === mode.switchOn_userLogged;

    const isAdminModeOn = !isUserModeOn;
    const isAdminLogged = secModeContextValue.secModesState === mode.switchOn_adminLogged;

    const handleHumburgerClick = () => {
        setIsSideBarShown(true);
    };

    useEffect(() => {
        if (isUserLogged && !userContextValue.firstName) {
            const getUserAccountInfo = async () => {
                try {
                    const { data } = await getUserAccount(authContextValue.userToken);
                    const { cart, user } = data;
                    userContextValue.setFirstName(user.firstName);
                    localStorage.setItem(USER_NAME, user.firstName);
                    cartContextValue.cartDispacher(creatCartAction(cartActionType.INIT_CART, cart.books));
                } catch (err) {
                    console.log(err.message);
                }
            };

            getUserAccountInfo();
        } else if (isAdminLogged && !userContextValue.firstName) {
            const getAdminAccountInfo = async () => {
                try {
                    const { data } = await getAdminAccount(authContextValue.adminToken);
                    const { admin } = data;
                    userContextValue.setFirstName(admin.firstName);
                    localStorage.setItem(ADMIN_NAME, admin.firstName);
                } catch (err) {
                    console.log(err.message);
                }
            };

            getAdminAccountInfo();
        }
    }, []);

    return (
        <header className="header">
            <h1>
                <Link className="text-link" to="/">
                    Book Depository
                    <img className="book-img" src={bookIcon} alt="" />
                </Link>
            </h1>
            {isUserModeOn && (
                <HeaderUserInfo
                    isLogged={isUserLogged}
                    cartContextValue={cartContextValue}
                    userContextValue={userContextValue}
                    greeting="Hi"
                />
            )}
            {isAdminModeOn && <HeaderAdminInfo greeting="Hello"></HeaderAdminInfo>}

            <HumburgerBtn onClick={handleHumburgerClick} />
            {showSideBar && <Sidebar show={setIsSideBarShown} />}
        </header>
    );
};

export default Header;
