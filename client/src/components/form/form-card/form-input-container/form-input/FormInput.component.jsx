import React from 'react';
import './form-input.style.css';
import '../../../../shared-style.css';

const FormInput = (props) => {
    return (
        <input
            className={`form-input ${props.scroll ? props.scroll : ''}`}
            id={props.id}
            type={props.type || 'text'}
            step={props.step || 1}
            min={props.min}
            required={props.required}
            placeholder={props.placeholder}
            onInput={props.handleInput}
            name={props.name}
        />
    );
};

export default FormInput;
