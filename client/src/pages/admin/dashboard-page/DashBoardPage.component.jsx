import React, { useState, useEffect, useContext } from 'react';
import Loader from '../../../components/shared/loader/Loader.component.jsx';
import DashBoard from './dashBoard/DashBoard.component.jsx';
import { mode, securityModeContext } from '../../../contexts/SecurityMode.context.jsx';
import ModeSwitch from '../../../components/shared/mode-switch/ModeSwitch.component.jsx';
import { LOADER_TIMEOUT } from '../../../constants/constants.js';

import { useNavigate } from 'react-router-dom';
import './dashboard-page.style.css';

const DashBoardPage = () => {
    const navigate = useNavigate();
    const secModeContextVal = useContext(securityModeContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (secModeContextVal.secModesState !== mode.switchOn_adminLogged) {
            navigate('/');
        }
        setTimeout(() => {
            setIsLoading(false);
        }, LOADER_TIMEOUT);
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="main dashboard-main">
            <ModeSwitch />
            <DashBoard />
        </main>
    );
};

export default DashBoardPage;
