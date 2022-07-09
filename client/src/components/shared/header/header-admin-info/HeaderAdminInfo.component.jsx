import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../../../../contexts/User.context.jsx';
import { mode, securityModeContext } from '../../../../contexts/SecurityMode.context.jsx';
import adminLogo from '../../../../assets/img/admin-icon.png';
import './header-admin-info.style.css';

const HeaderAdminInfo = (props) => {
    const userContextValue = useContext(UserContext);
    const secModeContextVal = useContext(securityModeContext);
    const isLogged = secModeContextVal.secModesState === mode.switchOn_adminLogged;

    return (
        <div className="admin-img-container">
            <Link to={isLogged ? '/admin/dashboard' : '/login'}>
                <img className="admin-img" src={adminLogo} alt="" />
            </Link>

            {isLogged ? (
                <div className="logged-admin-info">
                    <div className="admin-name">
                        <span>{`${props.greeting} `}</span>
                        <span>
                            {userContextValue.firstName &&
                                userContextValue.firstName.charAt(0).toUpperCase() +
                                    userContextValue.firstName.slice(1)}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="logged-admin-info">
                    <div className="admin-name">
                        <span>{`${props.greeting} `}</span>
                        <span>Admin</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderAdminInfo;
