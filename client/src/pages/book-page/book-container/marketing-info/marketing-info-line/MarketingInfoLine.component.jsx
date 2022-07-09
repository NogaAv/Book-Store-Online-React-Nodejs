import React from 'react';
import './marketin-info-line.style.css';

const MarketingInfoLine = (props) => {
    return (
        <div className="icon">
            <img className="icon-img" src={props.logo} alt="" />
            <div>
                <b>{props.children}</b>
            </div>
        </div>
    );
};

export default MarketingInfoLine;
