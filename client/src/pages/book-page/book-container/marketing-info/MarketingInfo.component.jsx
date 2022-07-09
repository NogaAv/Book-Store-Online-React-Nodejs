import React from 'react';
import './marketing-info.style.css';

const MarketingInfo = (props) => {
    return (
        <div className="marketing-info">
            <div className="container">{props.children}</div>
        </div>
    );
};

export default MarketingInfo;
