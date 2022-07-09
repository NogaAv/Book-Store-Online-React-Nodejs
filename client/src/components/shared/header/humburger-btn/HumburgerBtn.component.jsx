import React from 'react';
import './humburger-btn.style.css';

const HumburgerBtn = (props) => {
    return (
        <button className="humburger-btn" onClick={props.onClick}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </button>
    );
};

export default HumburgerBtn;
