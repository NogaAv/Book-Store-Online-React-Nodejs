import { createContext, useState } from 'react';
import { USER_TOKEN, ADNIN_TOKEN } from '../constants/constants.js';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    let token = localStorage.getItem(USER_TOKEN);
    token = token ? token : null;
    const [userToken, setUserToken] = useState(token);

    let admToken = localStorage.getItem(ADNIN_TOKEN);
    admToken = admToken ? admToken : null;
    const [adminToken, setAdminToken] = useState(admToken);

    const value = {
        userToken: userToken,
        setUserToken: setUserToken,

        adminToken: adminToken,
        setAdminToken: setAdminToken,
    };

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;
