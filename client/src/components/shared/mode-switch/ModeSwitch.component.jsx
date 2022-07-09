import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { securityModeContext, mode } from '../../../contexts/SecurityMode.context.jsx';
import { AuthContext } from '../../../contexts/Auth.context.jsx';
import { UserContext } from '../../../contexts/User.context.jsx';
import Loader from '../../../components/shared/loader/Loader.component.jsx';
import switchToAdminIcon from '../../../assets/img/user-to-admin-icon.png';
import switchToUserIcon from '../../../assets/img/admin-to-user-icon.png';
import { USER_NAME, ADMIN_NAME } from '../../../constants/constants.js';

import './mode-switch.style.css';

const ModeSwitch = () => {
    const navigate = useNavigate();
    const securityModeContextValue = useContext(securityModeContext);
    const authContextValue = useContext(AuthContext);
    const userContextValue = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const isSecModesSwitchEnabled = securityModeContextValue.secModesState > mode.SwitchOff_userLogged;

    const switchMode = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 900);

        switch (securityModeContextValue.secModesState) {
            case mode.switchOn_userNotLogged:
            case mode.switchOn_userLogged: {
                if (authContextValue.adminToken) {
                    //localStorage MUST be set before securityModeContextValue.setSecModesState
                    localStorage.setItem('security-mode-state', `${mode.switchOn_adminLogged}`);

                    securityModeContextValue.setSecModesState(mode.switchOn_adminLogged);
                    userContextValue.setFirstName(localStorage.getItem(ADMIN_NAME));
                    navigate('/');
                } else {
                    localStorage.setItem('security-mode-state', `${mode.switchOn_adminNotLogged}`);

                    securityModeContextValue.setSecModesState(mode.switchOn_adminNotLogged);
                    userContextValue.setFirstName('');
                    navigate('/login');
                }
                break;
            }
            case mode.switchOn_adminNotLogged:
            case mode.switchOn_adminLogged: {
                if (authContextValue.userToken) {
                    localStorage.setItem('security-mode-state', `${mode.switchOn_userLogged}`);

                    securityModeContextValue.setSecModesState(mode.switchOn_userLogged);
                    userContextValue.setFirstName(localStorage.getItem(USER_NAME));

                    navigate('/');
                } else {
                    localStorage.setItem('security-mode-state', `${mode.switchOn_userNotLogged}`);

                    securityModeContextValue.setSecModesState(mode.switchOn_userNotLogged);
                    userContextValue.setFirstName('');
                    navigate('/login');
                }
                break;
            }
            default: {
                console.log('Error in switchMode(). This block cannot be reached. file: ModeSwitch.component.jsx');
            }
        }
    };

    return isSecModesSwitchEnabled ? (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <button
                    className={`mode-switch-btn ${
                        securityModeContextValue.secModesState > mode.switchOn_userLogged ? `user-btn` : `admin-btn`
                    }`}
                    onClick={switchMode}
                >
                    <img
                        className="switch-modes-img"
                        src={
                            securityModeContextValue.secModesState > mode.switchOn_userLogged
                                ? switchToUserIcon
                                : switchToAdminIcon
                        }
                        alt=""
                    />
                </button>
            )}
        </>
    ) : (
        <></>
    );
};

export default ModeSwitch;
