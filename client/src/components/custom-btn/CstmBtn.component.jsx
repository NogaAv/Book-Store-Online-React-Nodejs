import React, { useState } from 'react';
import { LOADER_TIMEOUT } from '../../constants/constants.js';
import './cstm-btn.style.css';

const CstmBtn = ({ className, onClick, type, alert, children }) => {
    const [isShowingAlert, setShowingAlert] = useState(false);

    const clickHandler = () => {
        if (onClick) {
            onClick();
            if (alert) {
                setShowingAlert(true);
                setTimeout(() => {
                    setShowingAlert(false);
                }, LOADER_TIMEOUT);
            }
        }
    };
    return (
        <>
            <button className={`cstm-btn ${className}`} type={type || 'button'} onClick={clickHandler}>
                {isShowingAlert && <div className="alert">{alert}</div>}
                {children}
            </button>
        </>
    );
};

export default CstmBtn;
