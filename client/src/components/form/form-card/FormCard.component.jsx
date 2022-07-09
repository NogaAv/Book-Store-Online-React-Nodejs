import React from 'react';
import './form-card.style.css';

const FormCard = (props) => {
    return (
        <div className={`form-card ${props.border ? props.border : 'form-card-border'}`}>
            <h2 className="form-header">{props.title}</h2>
            <form className="form" onSubmit={props.onSubmit}>
                {props.children}
            </form>
        </div>
    );
};

export default FormCard;
