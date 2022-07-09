import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { mode, securityModeContext } from '../../contexts/SecurityMode.context.jsx';
import Loader from '../../components/shared/loader/Loader.component.jsx';
import LoginForm from './login-form/LoginForm.component.jsx';
import { LOADER_TIMEOUT } from '../../constants/constants.js';

const LoginPage = () => {
    const navigate = useNavigate();
    const secModeContextValue = useContext(securityModeContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (
            secModeContextValue.secModesState === mode.SwitchOff_userLogged ||
            secModeContextValue.secModesState === mode.switchOn_userLogged ||
            secModeContextValue.secModesState === mode.switchOn_adminLogged
        ) {
            navigate('/');
        }

        setTimeout(() => setIsLoading(false), LOADER_TIMEOUT);
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="main form-main">
            <LoginForm title="Login"></LoginForm>
        </main>
    );
};

export default LoginPage;
