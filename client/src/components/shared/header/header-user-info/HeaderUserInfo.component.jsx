import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../../../../contexts/User.context.jsx';
import { mode, securityModeContext } from '../../../../contexts/SecurityMode.context.jsx';
import { CartContext } from '../../../../contexts/cart.context.jsx';
import cartLogo from '../../../../assets/img/cart-logo.png';
import './header-user-info.style.css';

const HeaderUserInfo = (props) => {
    const userContextValue = useContext(UserContext);
    const secModeContextVal = useContext(securityModeContext);
    const cartContextValue = useContext(CartContext);
    const isLogged =
        secModeContextVal.secModesState === mode.switchOn_userLogged ||
        secModeContextVal.secModesState === mode.SwitchOff_userLogged;

    return (
        <div className="cart-img-container">
            <Link to="/cart">
                <img className="cart-img" src={cartLogo} alt="" />
            </Link>

            {isLogged ? (
                <div className="logged-cart-info">
                    <div className="items-in-cart">{cartContextValue.cartState.itemsCount}</div>
                    <div className="user-name">
                        {`${props.greeting} `}
                        {userContextValue.firstName &&
                            userContextValue.firstName.charAt(0).toUpperCase() + userContextValue.firstName.slice(1)}
                    </div>
                </div>
            ) : (
                <div className="logged-cart-info">
                    <div className="user-name">{`${props.greeting} `}guest</div>
                </div>
            )}
        </div>
    );
};

export default HeaderUserInfo;
