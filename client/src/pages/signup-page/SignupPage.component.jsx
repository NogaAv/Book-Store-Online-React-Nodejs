import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { mode, securityModeContext } from '../../contexts/SecurityMode.context.jsx';
import Loader from '../../components/shared/loader/Loader.component.jsx';
import SignupForm from './signup-form/SignupForm.component.jsx';
import { LOADER_TIMEOUT } from '../../constants/constants.js';
import './signup.style.css';

const SignupPage = () => {
    const navigate = useNavigate();
    const secModeContextVal = useContext(securityModeContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), LOADER_TIMEOUT);
        if (
            secModeContextVal.secModesState > mode.switchOn_userNotLogged ||
            secModeContextVal.secModesState === mode.SwitchOff_userLogged
        ) {
            navigate('/');
        }
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="main form-main">
            <SignupForm title="Join"></SignupForm>
        </main>
    );
};

export default SignupPage;
