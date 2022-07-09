import React, { useState, useEffect } from 'react';
import Loader from '../../components/shared/loader/Loader.component.jsx';
import { LOADER_TIMEOUT } from '../../constants/constants.js';
import './page-not-found.style.css';

const PageNotFound = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), LOADER_TIMEOUT);
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="main page-not-found">
            <h3>Page Not Found</h3>
            <h1>404</h1>
        </main>
    );
};

export default PageNotFound;
