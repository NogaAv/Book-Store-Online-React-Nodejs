import React, { createContext, useState, useContext } from 'react';
import environments from '../environments/environments';
import { AuthContext } from './Auth.context';

export const mode = {
    switchOff_userNotLogged: 0,
    SwitchOff_userLogged: 1,
    switchOn_userNotLogged: 2,
    switchOn_userLogged: 3,
    switchOn_adminNotLogged: 4,
    switchOn_adminLogged: 5,
};
export const securityModeContext = createContext();

const UpdateSecurityModeInStorage = () => {
    const authContextVal = useContext(AuthContext);

    if (environments.SECURITY_MODES_SWITCH_DISABLED && +`${environments.SECURITY_MODES_SWITCH_DISABLED}` !== 0) {
        authContextVal.userToken
            ? localStorage.setItem('security-mode-state', `${mode.SwitchOff_userLogged}`)
            : localStorage.setItem('security-mode-state', `${mode.switchOff_userNotLogged}`);
    } else {
        const secModeState = localStorage.getItem('security-mode-state');

        if (!secModeState) {
            authContextVal.userToken
                ? localStorage.setItem('security-mode-state', `${mode.switchOn_userLogged}`)
                : localStorage.setItem('security-mode-state', `${mode.switchOn_userNotLogged}`);
        } else {
            if (+secModeState > 3) {
                authContextVal.adminToken
                    ? localStorage.setItem('security-mode-state', `${mode.switchOn_adminLogged}`)
                    : localStorage.setItem('security-mode-state', `${mode.switchOn_adminNotLogged}`);
            } else {
                authContextVal.userToken
                    ? localStorage.setItem('security-mode-state', `${mode.switchOn_userLogged}`)
                    : localStorage.setItem('security-mode-state', `${mode.switchOn_userNotLogged}`);
            }
        }
    }
};

const SecurityModeContextProvider = (props) => {
    UpdateSecurityModeInStorage();
    const currentSecModeState = +localStorage.getItem('security-mode-state');
    const [secModesState, setSecModesState] = useState(currentSecModeState);

    const value = {
        secModesState: secModesState,
        setSecModesState: setSecModesState,
    };

    return <securityModeContext.Provider value={value}>{props.children}</securityModeContext.Provider>;
};

export default SecurityModeContextProvider;
